import {
	ConflictException,
	Injectable,
	NotFoundException
} from "@nestjs/common"
import { UpdateUser, User } from "./User"
import { importNanoid } from "../esmLoader"
import { UserSession } from "./UserSession"

@Injectable()
export class AuthService {
	protected readonly usersById = new Map<string, User>()
	protected readonly userSessionsByToken = new Map<string, UserSession>()

	public getUsers() {
		return Array.from(this.usersById.values())
	}

	public getUserById(userId: string) {
		return this.usersById.get(userId)
	}
	public getUserByUsername(username: string) {
		return this.getUsers().find((user) => user.username === username)
	}

	public async addUser(username: string) {
		const existingUser = this.getUserByUsername(username)
		if (existingUser)
			throw new ConflictException(`User with name ${username} already exists`)

		const { nanoid } = await importNanoid()
		const newUser = User.parse({
			id: nanoid(),
			username: username,
			password: nanoid(8)
		} as User)

		this.usersById.set(newUser.id, newUser)
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

	/**
	 * Logs a user in and returns a session if successful
	 * If no user with the given name exists or the user password combo is not correct throws `NotFoundException`
	 * @param username
	 * @param password
	 */
	public async loginUser(username: string, password: string) {
		const user = this.getUserByUsername(username)
		if (!user) throw new NotFoundException()
		if (user.password !== password) throw new NotFoundException()

		const { nanoid } = await importNanoid()
		const session = UserSession.parse({
			token: nanoid(64),
			userId: user.id
		} as UserSession)

		this.userSessionsByToken.set(session.token, session)
		return session
	}

	public logoutUser(token: string) {
		this.userSessionsByToken.delete(token)
		return true
	}

	public getUserSession(token: string) {
		const session = this.userSessionsByToken.get(token)
		if (!session) return undefined
		const user = this.getUserById(session.userId)
		if (!user) {
			this.logoutUser(token)
			return undefined
		}

		if (session.expiresAt >= new Date().getTime()) {
			this.logoutUser(token)
			return undefined
		}

		return {
			user,
			session
		}
	}

	public async refreshUserSession(token: string) {
		const currentSession = this.getUserSession(token)
		if (!currentSession) return undefined
		const { user } = currentSession
		return await this.loginUser(user.username, user.password)
	}
}
