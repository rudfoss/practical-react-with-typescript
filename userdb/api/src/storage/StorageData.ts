import { Group, UserSession, UserWithPassword } from "../models"

export interface StorageData {
	users: UserWithPassword[]
	userSessions: UserSession[]
	groups: Group[]
}
