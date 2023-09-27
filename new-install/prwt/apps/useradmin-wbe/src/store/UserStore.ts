import { User, UserMemberships } from "./models"

export const UserStore_Token = Symbol("UserStore")

export interface UserStore {
	getUser(id: string): Promise<User | undefined>
	getUserByUserName(userName: string): Promise<User | undefined>
	setUser(user: User): Promise<User>
	deleteUser(id: string): Promise<User | undefined>

	getUserMemberships(userId: string): Promise<UserMemberships | undefined>
	setUserMemberships(
		userId: string,
		groupIds: Iterable<string>
	): Promise<UserMemberships | undefined>

	getUsers(): Promise<Iterable<User>>
}
