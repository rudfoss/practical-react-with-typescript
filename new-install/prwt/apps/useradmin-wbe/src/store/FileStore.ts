import path from "node:path"

import { Injectable, Logger } from "@nestjs/common"
import fs from "fs-extra"

import { InMemoryStore } from "./InMemoryStore"
import { RawDataStore } from "./data"
import { Group, User } from "./models"

@Injectable()
export class FileStore extends InMemoryStore {
	protected logger: Logger = new Logger(FileStore.name)

	protected filePath = path.resolve(__dirname, "useradmin-wbe-data.json")

	public constructor() {
		super()
		this.logger.log(`Using persisted store to file "${this.filePath}"`)
		this.tryLoadData()
	}

	public async tryLoadData() {
		this.logger.log(`Try loading data from "${this.filePath}"`)
		if (!(await fs.exists(this.filePath))) {
			this.logger.log(`File not found "${this.filePath}"`)
			return
		}

		const rawDataStore: RawDataStore = JSON.parse(await fs.readJson(this.filePath))
		this.logger.log("Try parsing data into store")
		this.dataStore.fromJSON(rawDataStore, true)
	}

	public async persist() {
		const rawDataStore = JSON.stringify(this.dataStore)
		this.logger.log(`Persisting data to "${this.filePath}"`)
		await fs.writeJson(this.filePath, rawDataStore)
	}

	public async doAndPersist<T>(action: () => T) {
		const result = await action()
		await this.persist()
		return result
	}

	public async setUser(user: User) {
		return this.doAndPersist(() => super.setUser(user))
	}
	public async deleteUser(id: string) {
		return this.doAndPersist(() => super.deleteUser(id))
	}
	public async setGroup(group: Group) {
		return this.doAndPersist(() => super.setGroup(group))
	}
	public async deleteGroup(id: string) {
		return this.doAndPersist(() => super.deleteGroup(id))
	}

	public async setUserMemberships(userId: string, groupIds: Iterable<string>) {
		return this.doAndPersist(() => super.setUserMemberships(userId, groupIds))
	}
	public async setMembersOfGroup(groupId: string, userIds: Iterable<string>) {
		return this.doAndPersist(() => super.setMembersOfGroup(groupId, userIds))
	}

	private static _fileStoreInstance: FileStore | undefined
	public static getSharedInstance() {
		return (FileStore._fileStoreInstance = FileStore._fileStoreInstance ?? new FileStore())
	}
}
