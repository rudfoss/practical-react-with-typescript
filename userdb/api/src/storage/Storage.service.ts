import { Group, UserSession, UserWithPassword } from "../models"

export const StorageServiceOptionsKey = Symbol("StorageServiceOptionsKey")
export const StorageServiceKey = Symbol("StorageServiceKey")

export type Setter<TType> = (oldValue: TType) => TType | Promise<TType>

export interface StorageService {
	getUsers(): Promise<UserWithPassword[]>
	setUsers(usersSetter: Setter<UserWithPassword[]>): Promise<UserWithPassword[]>

	getGroups(): Promise<Group[]>
	setGroups(groupsSetter: Setter<Group[]>): Promise<Group[]>

	getUserSessions(): Promise<UserSession[]>
	setUserSessions(userSessionsSetter: Setter<UserSession[]>): Promise<UserSession[]>
}
