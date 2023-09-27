import { Group, GroupMemberships } from "./models"

export const GroupStore_Token = Symbol("GroupStore")

export interface GroupStore {
	getGroup(id: string): Promise<Group | undefined>
	getGroupByName(name: string): Promise<Group | undefined>
	setGroup(group: Group): Promise<Group>
	deleteGroup(id: string): Promise<Group | undefined>

	getMembersOfGroup(groupId: string): Promise<GroupMemberships | undefined>
	setMembersOfGroup(
		groupId: string,
		userIds: Iterable<string>
	): Promise<GroupMemberships | undefined>

	getGroups(): Promise<Iterable<Group>>
}
