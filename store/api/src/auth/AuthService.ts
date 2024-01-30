import { Inject, Injectable } from "@nestjs/common"

import { UserSession } from "../models"
import { StorageService, StorageServiceKey } from "../storage"

import { LoginRequest } from "./LoginRequest"

const SESSOIN_LIFETIME_MS = 1000 * 60 * 30 // 30 minutes in ms

@Injectable()
export class AuthService {
	public constructor(@Inject(StorageServiceKey) protected storageService: StorageService) {}

	/**
	 * Given a session will check if it is not expired and if it is remove it.
	 * @param session
	 * @returns
	 */
	protected async ensureSessionActive(session: UserSession) {
		const now = new Date().getTime()
		if (session.expiresAt <= now) {
			await this.storageService.dropUserSession(session.token)
			return undefined
		}
		return session
	}

	public async getUserSessions() {
		return await this.storageService.getUserSessions()
	}

	public async getUserSession(sessionToken: string) {
		const session = (await this.getUserSessions()).find(({ token }) => token === sessionToken)
		if (!session) return undefined
		return this.ensureSessionActive(session)
	}

	public async getUserSessionAndUser(sessionToken: string) {
		const userSession = await this.getUserSession(sessionToken)
		if (!userSession) return { userSession, user: undefined }
		const user = (await this.storageService.getUsers()).find(({ id }) => userSession.userId === id)
		return { userSession, user }
	}

	public async login({ username, password }: LoginRequest) {
		const user = (await this.storageService.getUsers()).find(
			(user) => user.username === username && user.password === password
		)
		if (!user) return undefined

		const currentSession = (await this.getUserSessions()).find(
			(session) => session.userId === user.id
		)
		if (currentSession) {
			await this.storageService.dropUserSession(currentSession.token)
		}

		return await this.storageService.createUserSession(user.id, SESSOIN_LIFETIME_MS)
	}
}
