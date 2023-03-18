import { Group, User } from "../models"

import { mockGroups } from "./mockGroups"
import { mockUsers } from "./mockUsers"

export interface RawDataStore {
	users: Record<string, User>
	groups: Record<string, Group>
	userIdsByGroupId: Record<string, string[]>
}

export class DataStore {
	public readonly users: Map<string, User> = new Map()
	public readonly groups: Map<string, Group> = new Map()

	/**
	 * Contains user ids indexed by a single group id
	 */
	public readonly userIdsByGroupId: Map<string, Set<string>> = new Map()

	/**
	 * Converts the object to a JSON representation
	 */
	public toJSON(): RawDataStore {
		const users: RawDataStore["users"] = {}
		const groups: RawDataStore["groups"] = {}
		const userIdsByGroupId: RawDataStore["userIdsByGroupId"] = {}

		for (const user of this.users.values()) {
			users[user.id] = user
		}
		for (const group of this.groups.values()) {
			groups[group.id] = group
		}
		for (const [groupId, members] of this.userIdsByGroupId) {
			userIdsByGroupId[groupId] = Array.from(members)
		}

		return { users, groups, userIdsByGroupId }
	}
	/**
	 * Loads data from a JSON representation into this object
	 * @param data
	 */
	public fromJSON({ users = {}, groups = {}, userIdsByGroupId = {} }: Partial<RawDataStore>) {
		for (const user of Object.values(users)) {
			this.users.set(user.id, user)
		}
		for (const group of Object.values(groups)) {
			this.groups.set(group.id, group)
		}
		for (const [groupId, members] of Object.entries(userIdsByGroupId)) {
			const existingMembers = this.userIdsByGroupId.get(groupId) ?? new Set()
			for (const member of members) {
				existingMembers.add(member)
			}
			this.userIdsByGroupId.set(groupId, existingMembers)
		}
	}

	public static fromMockData() {
		const instance = new DataStore()
		for (const group of Object.values(mockGroups)) {
			instance.groups.set(group.id, group)
		}

		for (const userWithMemberships of mockUsers) {
			const { memberOf, ...user } = userWithMemberships
			instance.users.set(user.id, user)
			for (const memberGroupId of memberOf) {
				const memberships = instance.userIdsByGroupId.get(memberGroupId) ?? new Set()
				memberships.add(user.id)
				instance.userIdsByGroupId.set(memberGroupId, memberships)
			}
		}

		return instance
	}
}
