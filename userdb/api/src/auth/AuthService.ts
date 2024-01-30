import { Inject, Injectable } from "@nestjs/common"

import { esmLoader, merge } from "@react-workshop/utils"

import { User, UserDbRole, UserSession } from "../models"
import { StorageService, StorageServiceKey } from "../storage"

import { LoginRequest } from "./LoginRequest"

const importNanoid = () => esmLoader<typeof import("nanoid")>("nanoid")

const SESSOIN_LIFETIME_MS = 1000 * 60 * 30 // 30 minutes in ms

export interface SessionUserRoles {
	session?: UserSession
	user?: User
	roles?: UserDbRole[]
}

@Injectable()
export class AuthService {
	public constructor(@Inject(StorageServiceKey) protected storageService: StorageService) {}

	public async getUser(username: string, password: string) {
		const users = await this.storageService.getUsers()
		return users.find((user) => user.username === username && user.password === password)
	}
	public async getUserById(userId: string) {
		const users = await this.storageService.getUsers()
		return users.find((user) => user.id === userId)
	}
	public async getUserGroups(user: User) {
		return (await this.storageService.getGroups()).filter((group) =>
			user.groupIds?.includes(group.id)
		)
	}

	public async login({ username, password }: LoginRequest) {
		const user = await this.getUser(username, password)
		if (!user) return undefined

		return this.createNewSession(user.id)
	}
	public async getSession(sessionToken: string) {
		const allSessions = await this.storageService.getUserSessions()
		const session = allSessions.find((session) => session.token === sessionToken)
		return await this.isSessionActive(session)
	}
	public async getSessionUserAndRoles(sessionToken: string) {
		const result: SessionUserRoles = {}
		result.session = await this.getSession(sessionToken)
		if (!result.session) return result

		const userWithPassword = await this.getUserById(result.session.userId)
		if (!userWithPassword) return result
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...user } = userWithPassword

		result.user = user

		const groups = await this.getUserGroups(user)
		result.roles = groups.flatMap((group) => group.roles)

		return result
	}
	public async createNewSession(userId: string, basedOnSesssion?: UserSession) {
		const now = new Date().getTime()
		const { nanoid } = await importNanoid()
		const newSession = merge(new UserSession(), {
			createdAt: now,
			token: nanoid(),
			userId,
			...(basedOnSesssion ?? {}),
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

	protected async isSessionActive(session?: UserSession) {
		if (!session) return undefined
		const now = new Date().getTime()
		if (session.expiresAt <= now) {
			await this.logout(session.token)
			return undefined
		}
		return session
	}
}
