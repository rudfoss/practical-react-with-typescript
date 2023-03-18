import { Group, User } from "../models"

import { mockGroups } from "./mockGroups"
import { mockUsers } from "./mockUsers"

export interface DataStore {
	users: Map<string, User>
	groups: Map<string, Group>
	/**
	 * Contains user ids indexed by a single group id
	 */
	userIdsByGroupId: Map<string, Set<string>>
}

export const createDataStore = (): DataStore => {
	const users: Map<string, User> = new Map()
	const groups: Map<string, Group> = new Map(Object.entries(mockGroups))
	const userIdsByGroupId: Map<string, Set<string>> = new Map()

	for (const userWithMemberships of mockUsers) {
		const { memberOf, ...user } = userWithMemberships
		users.set(user.id, user)
		for (const memberGroupId of memberOf) {
			const memberships = userIdsByGroupId.get(memberGroupId) ?? new Set()
			memberships.add(user.id)
			userIdsByGroupId.set(memberGroupId, memberships)
		}
	}

	return {
		users,
		groups,
		userIdsByGroupId
	}
}
