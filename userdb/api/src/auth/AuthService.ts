import { Inject, Injectable } from "@nestjs/common"

import { esmLoader, merge } from "@react-workshop/utils"

import { UserSession } from "../models"
import { StorageService, StorageServiceKey } from "../storage"

import { LoginRequest } from "./LoginRequest"

const importNanoid = () => esmLoader<typeof import("nanoid")>("nanoid")

const SESSOIN_LIFETIME_MS = 1000 * 60 * 30 // 30 minutes in ms

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
	public async getSessionAndUser(sessionToken: string) {
		const userSession = await this.getSession(sessionToken)
		if (!userSession) return { userSession: undefined, user: undefined }
		const userWithPassword = await this.getUserById(userSession.userId)
		if (!userWithPassword) return { userSession, user: undefined }
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...user } = userWithPassword

		return {
			userSession,
			user
		}
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

		const nextSesssions = (await this.storageService.getUserSessions()).filter(
			(session) => session.token !== newSession.token
		)
		nextSesssions.push(newSession)
		await this.storageService.setUserSessions(nextSesssions)

		return newSession
	}
	public async logout(sessionToken: string) {
		const sessions = await this.storageService.getUserSessions()
		await this.storageService.setUserSessions(
			sessions.filter((session) => session.token !== sessionToken)
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
