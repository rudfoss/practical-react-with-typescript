import { Inject, Injectable } from "@nestjs/common"

import {
	Group,
	NewUser,
	PatchUser,
	User,
	UserDatabaseRole,
	UserSession,
	UserWithPassword
} from "../models"
import { UserInformation } from "../models/UserInformation"
import { StorageService, StorageServiceKey } from "../storage"

import { LoginRequest } from "./LoginRequest"
import { UidGenerator, UidGeneratorKey } from "./UidGenerator"

/**
 * Default lifetime for sessions
 */
export const SESSOIN_LIFETIME_MS = 1000 * 60 * 30 // 30 minutes in ms

export interface SessionUserRoles {
	session?: UserSession
	user?: User
	groups?: Group[]
	roles?: UserDatabaseRole[]
}

@Injectable()
export class AuthService {
	public constructor(
		@Inject(StorageServiceKey) protected storageService: StorageService,
		@Inject(UidGeneratorKey) protected uidGenerator: UidGenerator
	) {}

	public async getUserWithPasswordByUsername(username: string) {
		const users = await this.storageService.getUsers()
		return users.find((user) => user.username === username)
	}
	public async getUserByUsername(username: string) {
		const userWithPassword = await this.getUserWithPasswordByUsername(username)
		return userWithPassword ? new User(userWithPassword, { whitelist: true }) : undefined
	}
	public async getUser(username: string, password: string) {
		const userWithPassword = await this.getUserWithPasswordByUsername(username)
		if (!userWithPassword) return
		if (userWithPassword.password !== password) return

		return new User(userWithPassword, { whitelist: true })
	}
	public async getUserWithPasswordById(userId: string) {
		const users = await this.storageService.getUsers()
		return users.find((user) => user.id === userId)
	}
	public async getUserById(userId: string) {
		const users = await this.storageService.getUsers()
		const userWithPassword = users.find((user) => user.id === userId)
		if (!userWithPassword) return
		return new User(userWithPassword, { whitelist: true })
	}
	public async getUserGroups(user: User) {
		const groups = await this.storageService.getGroups()
		return groups.filter((group) => user.groupIds?.includes(group.id))
	}
	public async getUserInformation(userId: string) {
		const user = await this.getUserById(userId)
		if (!user) return

		const groups = (await this.getUserGroups(user)) ?? []
		const roles = new Set(groups.flatMap((group) => group.roles))

		return new UserInformation({
			user,
			groups,
			roles: [...roles]
		})
	}

	public async login({ username, password }: LoginRequest) {
		const user = await this.getUser(username, password)
		if (!user) return

		return this.createSession(user.id)
	}
	public async getSession(sessionToken: string) {
		const allSessions = await this.storageService.getUserSessions()
		const session = allSessions.find((session) => session.token === sessionToken)
		return await this.isSessionActive(session)
	}
	public async createSession(userId: string, basedOnSesssion?: UserSession) {
		const now = Date.now()
		const newSession = new UserSession({
			createdAt: now,
			token: this.uidGenerator(),
			userId,
			...basedOnSesssion,
			expiresAt: now + SESSOIN_LIFETIME_MS
		})

		await this.storageService.setUserSessions((oldSessions) => {
			const nextSesssions = oldSessions.filter((session) => session.token !== newSession.token)
			nextSesssions.push(newSession)
			return nextSesssions
		})

		return newSession
	}
	public async logout(sessionToken: string) {
		await this.storageService.setUserSessions((oldSessions) =>
			oldSessions.filter((session) => session.token !== sessionToken)
		)
	}

	public async createUser(newUser: NewUser) {
		const userWithPassword = new UserWithPassword(
			{
				...newUser,
				id: this.uidGenerator()
			},
			{ forbidNonWhitelisted: true }
		)

		await this.storageService.setUsers((existingUsers) => {
			existingUsers.push(userWithPassword)
			return existingUsers
		})

		return new User(userWithPassword, { whitelist: true })
	}
	public async patchUser(patchUser: PatchUser, userId: string) {
		const existingUser = await this.getUserWithPasswordById(userId)
		if (!existingUser) return

		const patchedUser = new UserWithPassword(
			{ ...existingUser, ...patchUser },
			{ forbidNonWhitelisted: true }
		)

		await this.storageService.setUsers((existingUsers) => {
			const nextUsers = existingUsers.filter((user) => user.id !== userId)
			nextUsers.push(patchedUser)
			return nextUsers
		})

		return new User(patchedUser, { whitelist: true })
	}
	public async deleteUser(userId: string) {
		const existingUser = await this.getUserById(userId)
		if (!existingUser) return
		await this.storageService.setUsers((existingUsers) =>
			existingUsers.filter((user) => user.id !== userId)
		)
		return existingUser
	}

	protected async isSessionActive(session?: UserSession) {
		if (!session) return
		const now = Date.now()
		if (session.expiresAt <= now) {
			await this.logout(session.token)
			return
		}
		return session
	}
}
