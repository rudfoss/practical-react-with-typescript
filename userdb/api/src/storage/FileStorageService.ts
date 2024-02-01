import type { Low } from "lowdb/lib"

import { esmLoader } from "@react-workshop/utils"

import { Group, UserSession, UserWithPassword } from "../models"

import { StorageData } from "./StorageData"
import { Setter, StorageService } from "./StorageService"
import { defaultStoreData as defaultDatabaseData } from "./defaultStoreData"

const importLowdb = () => esmLoader<typeof import("lowdb/node")>("lowdb/node")

export interface FileStorageServiceOptions {
	fileName: string
}

export class FileStorageService implements StorageService {
	private db: Low<StorageData>

	protected constructor(public readonly options: Readonly<FileStorageServiceOptions>) {}

	protected get<TDBItem extends keyof StorageData>(
		key: TDBItem,
		instanceFactory?: (data?: StorageData[TDBItem][number]) => StorageData[TDBItem][number]
	): StorageData[TDBItem] {
		const data = this.db.data[key]
		if (!instanceFactory) return data

		// TypeScript seems to generalize too much here. This should type correctly from the outside.
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return data.map((item) => instanceFactory(item)) as any
	}
	protected async set<TDBItem extends keyof StorageData>(
		key: TDBItem,
		valueSetter: Setter<StorageData[TDBItem]>
	) {
		await this.db.update(async (data) => {
			data[key] = await valueSetter(data[key])
		})
		return this.db.data[key]
	}

	public async getUsers() {
		return this.get("users", (user) => new UserWithPassword(user))
	}
	public async setUsers(usersSetter: Setter<UserWithPassword[]>) {
		return this.set("users", usersSetter)
	}

	public async getGroups(): Promise<Group[]> {
		return this.get("groups", (group) => new Group(group))
	}
	public async setGroups(groupsSetter: Setter<Group[]>) {
		return this.set("groups", groupsSetter)
	}

	public async getUserSessions(): Promise<UserSession[]> {
		return this.get("userSessions", (userSession) => new UserSession(userSession))
	}
	public async setUserSessions(userSessionsSetter: Setter<UserSession[]>) {
		return this.set("userSessions", userSessionsSetter)
	}

	protected async flushInactiveSessions() {
		const now = Date.now()
		await this.setUserSessions((sessions) => sessions.filter((session) => session.expiresAt > now))
	}

	protected async init() {
		const { JSONFilePreset } = await importLowdb()
		this.db = await JSONFilePreset<StorageData>(this.options.fileName, defaultDatabaseData)
		this.flushInactiveSessions()
		return this
	}

	public static async createInstance(options: FileStorageServiceOptions) {
		return await new FileStorageService(options).init()
	}
}
