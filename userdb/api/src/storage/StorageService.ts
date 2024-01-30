import { UserSession, UserWithPassword } from "../models"

export const StorageServiceOptionsKey = Symbol("StorageServiceOptionsKey")
export const StorageServiceKey = Symbol("StorageServiceKey")

export interface StorageService {
	getUsers(): Promise<UserWithPassword[]>
	setUsers(users: UserWithPassword[]): Promise<void>

	getUserSessions(): Promise<UserSession[]>
	setUserSessions(userSessions: UserSession[]): Promise<void>
}
