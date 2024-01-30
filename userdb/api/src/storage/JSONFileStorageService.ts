import type { Low } from "lowdb/lib"

import { esmLoader } from "@react-workshop/utils"

import { UserSession, UserWithPassword } from "../models"

import { StorageData } from "./StorageData"
import { StorageService } from "./StorageService"
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
		value: StorageData[TDBItem]
	) {
		await this.db.update((data) => {
			data[key] = value
		})
	}

	public async getUsers() {
		return this.get("users")
	}
	public async setUsers(usersWithPassword: UserWithPassword[]) {
		await this.set("users", usersWithPassword)
	}

	public async getUserSessions(): Promise<UserSession[]> {
		return this.get("userSessions")
	}
	public async setUserSessions(userSessions: UserSession[]) {
		return this.set("userSessions", userSessions)
	}

	protected async flushInactiveSessions() {
		const now = new Date().getTime()
		await this.db.update((data) => {
			data.userSessions = data.userSessions.filter((session) => session.expiresAt > now)
		})
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
