import { Role, UserSession, UserWithPassword } from "../models"

export interface StorageData {
	users: UserWithPassword[]
	userSessions: UserSession[]
	roles: Role[]
}
