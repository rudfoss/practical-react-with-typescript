import { Injectable } from "@nestjs/common"

import { GroupStore } from "./GroupStore"
import { StoreDiagnostics } from "./StoreDiagnostics"
import { UserStore } from "./UserStore"
import { DataStore } from "./data"
import { Group, GroupMemberships, StoreDiagnosticsData, User, UserMemberships } from "./models"

@Injectable()
export class InMemoryStore implements UserStore, GroupStore, StoreDiagnostics {
	protected readonly dataStore: DataStore = DataStore.fromMockData()

	public async getUser(id: string) {
		return this.dataStore.users.get(id)
	}
	public async getUsers() {
		return this.dataStore.users.values()
	}
	public async getGroup(id: string) {
		return this.dataStore.groups.get(id)
	}
	public async getGroups() {
		return this.dataStore.groups.values()
	}

	public async setUser(user: User) {
		const userFromStore = await this.getUser(user.id)
		const newUser = {
			...(userFromStore ?? {}),
			...user
		}
		this.dataStore.users.set(user.id, newUser)
		return newUser
	}
	public async deleteUser(id: string) {
		const user = await this.getUser(id)
		if (!user) return undefined

		this.dataStore.users.delete(id)

		for (const memberships of this.dataStore.userIdsByGroupId.values()) {
			memberships.delete(user.id)
		}

		return user
	}
	public async setGroup(group: Group) {
		const groupFromStore = await this.getGroup(group.id)
		const newGroup = {
			...(groupFromStore ?? {}),
			...group
		}
		this.dataStore.groups.set(group.id, newGroup)
		return newGroup
	}
	public async deleteGroup(id: string) {
		const group = await this.getGroup(id)
		if (!group) return undefined

		this.dataStore.groups.delete(id)
		this.dataStore.userIdsByGroupId.delete(id)

		return group
	}

	public async getUserMemberships(userId: string): Promise<UserMemberships | undefined> {
		const user = await this.getUser(userId)
		if (!user) return undefined

		const memberships: UserMemberships = {
			user,
			memberOfIds: []
		}

		for (const [groupId, members] of this.dataStore.userIdsByGroupId.entries()) {
			if (members.has(userId)) {
				memberships.memberOfIds.push(groupId)
			}
		}

		return memberships
	}
	public async setUserMemberships(
		userId: string,
		groupIds: Iterable<string>
	): Promise<UserMemberships | undefined> {
		const user = await this.getUser(userId)
		if (!user) return undefined

		const groupIdsSet = new Set(groupIds)
		const allGroups = await this.getGroups()

		for (const group of allGroups) {
			const members = this.dataStore.userIdsByGroupId.get(group.id) ?? new Set()
			if (groupIdsSet.has(group.id)) {
				members.add(user.id)
			} else {
				members.delete(user.id)
			}
			this.dataStore.userIdsByGroupId.set(group.id, members)
		}

		return {
			user,
			memberOfIds: Array.from(groupIds)
		}
	}
	public async getMembersOfGroup(groupId: string): Promise<GroupMemberships | undefined> {
		const group = await this.getGroup(groupId)
		if (!group) return undefined

		return {
			group,
			memberIds: Array.from(this.dataStore.userIdsByGroupId.get(groupId) ?? [])
		}
	}
	public async setMembersOfGroup(
		groupId: string,
		userIds: Iterable<string>
	): Promise<GroupMemberships | undefined> {
		const group = await this.getGroup(groupId)
		if (!group) return undefined

		const groupMembers = this.dataStore.userIdsByGroupId.get(groupId) ?? new Set()
		for (const userId of userIds) {
			if (!this.dataStore.users.has(userId)) continue
			groupMembers.add(userId)
		}
		this.dataStore.userIdsByGroupId.set(groupId, groupMembers)

		return {
			group,
			memberIds: Array.from(userIds)
		}
	}

	public async getStoreDiagnostics(): Promise<StoreDiagnosticsData> {
		let nrOfDistinctMemberships = 0
		const nrOfMembersPerGroup: StoreDiagnosticsData["nrOfMembersPerGroup"] = []
		for (const [groupId, members] of this.dataStore.userIdsByGroupId.entries()) {
			nrOfDistinctMemberships += members.size
			nrOfMembersPerGroup.push({ groupId, nrOfMembers: members.size })
		}

		return {
			nrOfUsers: this.dataStore.users.size,
			nrOfGroups: this.dataStore.groups.size,
			nrOfDistinctMemberships,
			nrOfMembersPerGroup
		}
	}

	private static _inMemoryStoreInstance: InMemoryStore | undefined
	public static getSharedInstance() {
		return (InMemoryStore._inMemoryStoreInstance =
			InMemoryStore._inMemoryStoreInstance ?? new InMemoryStore())
	}
}
