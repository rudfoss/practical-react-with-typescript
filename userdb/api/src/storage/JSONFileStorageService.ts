import type { Low } from "lowdb/lib"

import { esmLoader } from "@react-workshop/utils"

import { Group, UserSession, UserWithPassword } from "../models"

import { StorageData } from "./StorageData"
import { Setter, StorageService } from "./StorageService"
import { defaultDbData } from "./defaultDbData"

const importLowdb = () => esmLoader<typeof import("lowdb/node")>("lowdb/node")

export interface JSONFileStorageServiceOptions {
	fileName: string
}

export class JSONFileStorageService implements StorageService {
	private db: Low<StorageData>

	protected constructor(public readonly options: Readonly<JSONFileStorageServiceOptions>) {}

	protected get<TDBItem extends keyof StorageData>(key: TDBItem): StorageData[TDBItem] {
		return this.db.data[key]
	}
	protected async set<TDBItem extends keyof StorageData>(
		key: TDBItem,
		valueSetter: Setter<StorageData[TDBItem]>
	) {
		await this.db.update(async (data) => {
			data[key] = await valueSetter(data[key])
		})
	}

	public async getUsers() {
		return this.get("users")
	}
	public async setUsers(usersSetter: Setter<UserWithPassword[]>) {
		await this.set("users", usersSetter)
	}

	public async getGroups(): Promise<Group[]> {
		return this.get("groups")
	}
	public async setGroups(groupsSetter: Setter<Group[]>) {
		return this.set("groups", groupsSetter)
	}

	public async getUserSessions(): Promise<UserSession[]> {
		return this.get("userSessions")
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
		this.db = await JSONFilePreset<StorageData>(this.options.fileName, defaultDbData)
		this.flushInactiveSessions()
		return this
	}

	public static async createInstance(options: JSONFileStorageServiceOptions) {
		return await new JSONFileStorageService(options).init()
	}
}
