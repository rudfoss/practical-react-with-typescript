import {
	ConflictException,
	ForbiddenException,
	Injectable,
	NotFoundException
} from "@nestjs/common"

import { importNanoid } from "../esmLoader"

import { ClientUser, NewUser, UpdateUser, User } from "./User"
import { Session, UserSession } from "./UserSession"
import { builtInUsers } from "./builtInUsers"

export const SESSION_EXPIRES_MS = 1000 * 60 * 30 // 30 mins

@Injectable()
export class AuthService {
	protected readonly usersById = new Map<string, User>(
		builtInUsers.map((user) => [user.id, user])
	)
	protected readonly sessionsByToken = new Map<string, Session>()

	public getClientUser(user: User): ClientUser {
		const clientUser = { ...user } as ClientUser & { password?: string }
		delete clientUser["password"]
		return clientUser
	}

	public getUsers() {
		return Array.from(this.usersById.values())
	}

	public getUserById(userId: string) {
		return this.usersById.get(userId)
	}
	public getUserByUsername(username: string) {
		return this.getUsers().find((user) => user.username === username)
	}

	public async createUser(newUser: NewUser) {
		const existingUser = this.getUserByUsername(newUser.username)
		if (existingUser)
			throw new ConflictException(
				`User with name ${newUser.username} already exists`
			)

		const { nanoid } = await importNanoid()
		const createdUser = User.parse({
			...newUser,
			id: nanoid()
		} as User)

		this.usersById.set(createdUser.id, createdUser)
		return newUser
	}
	public updateUser(userId: string, updateUser: UpdateUser) {
		const existingUser = this.getUserById(userId)
		if (!existingUser)
			throw new NotFoundException(`No user with id ${userId} exists`)

		const updatedUser = User.parse({
			...existingUser,
			...updateUser
		})

		this.usersById.set(updatedUser.id, updatedUser)
		return updatedUser
	}
	public deleteUser(userId: string) {
		const admins = Array.from(this.usersById.values()).filter(
			(user) => user.role === "admin"
		)
		if (admins.length === 1 && admins[0].id === userId) {
			throw new ForbiddenException("The last admin cannot be deleted.")
		}

		if (!this.usersById.delete(userId)) {
			return false
		}

		const sessions = Array.from(this.sessionsByToken.values()).filter(
			(session) => session.userId === userId
		)
		for (const session of sessions) {
			this.logoutUser(session.token)
		}
		return true
	}

	/**
	 * Logs a user in and returns a session if successful
	 * If no user with the given name exists or the user password combo is not correct throws `NotFoundException`
	 * @param username
	 * @param password
	 */
	public async loginUser(
		username: string,
		password: string
	): Promise<UserSession> {
		const user = this.getUserByUsername(username)
		if (!user) throw new NotFoundException()
		if (user.password !== password) throw new NotFoundException()

		const { nanoid } = await importNanoid()
		const userSession = UserSession.parse({
			session: {
				token: nanoid(64),
				userId: user.id,
				createdAt: new Date().getTime(),
				expiresAt: new Date().getTime() + SESSION_EXPIRES_MS
			},
			user: this.getClientUser(user)
		} as UserSession)

		this.sessionsByToken.set(userSession.session.token, userSession.session)
		return userSession
	}

	public logoutUser(token: string) {
		this.sessionsByToken.delete(token)
		return true
	}

	/**
	 * Gets the users active session. If the session is expired it is deleted.
	 * @param token
	 * @returns
	 */
	public getUserSession(token: string): UserSession | undefined {
		const session = this.sessionsByToken.get(token)
		if (!session) return undefined
		const user = this.getUserById(session.userId)
		if (!user) {
			this.logoutUser(token)
			return undefined
		}

		if (session.expiresAt <= new Date().getTime()) {
			this.logoutUser(token)
			return undefined
		}

		return UserSession.parse({
			user: this.getClientUser(user),
			session
		})
	}

	public async refreshUserSession(token: string) {
		const currentSession = this.getUserSession(token)
		if (!currentSession) return undefined
		const user = this.getUserById(currentSession.user.id)
		if (!user) return undefined
		return await this.loginUser(user.username, user.password)
	}
}
