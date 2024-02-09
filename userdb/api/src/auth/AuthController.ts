import { Body, Controller, Get, Inject, Post, Req, UseGuards } from "@nestjs/common"
import {
	ApiBadRequestResponse,
	ApiBearerAuth,
	ApiCreatedResponse,
	ApiForbiddenResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
	ApiUnauthorizedResponse
} from "@nestjs/swagger"

import { UserDatabaseApiRequestAuthenticated as UserDatabaseApiRequestAuthenticated } from "../RequestReply"
import {
	HttpBadRequestException,
	HttpForbiddenException,
	HttpUnauthorizedException
} from "../httpExceptions"
import { UserDatabaseRole, UserSession } from "../models"
import { StorageService, StorageServiceKey } from "../storage"

import { AuthGuard } from "./AuthGuard"
import { AuthService } from "./AuthService"
import { LogEveryoneOutResponse } from "./LogEveryoneOutResponse"
import { LoginRequest } from "./LoginRequest"
import { RequireRoles } from "./RequireRolesDecorator"
import { bearerAuthName } from "./authConstants"

@Controller("auth")
@ApiTags("Auth")
export class AuthController {
	public constructor(
		@Inject(AuthService) protected authService: AuthService,
		@Inject(StorageServiceKey) protected storageService: StorageService
	) {}

	@Post("login")
	@ApiOperation({
		summary: "Log a user in and get an active session"
	})
	@ApiCreatedResponse({ type: UserSession })
	@ApiUnauthorizedResponse({ type: HttpUnauthorizedException })
	@ApiBadRequestResponse({ type: HttpBadRequestException })
	public async login(@Body() loginRequest: LoginRequest) {
		const userSession = await this.authService.login(loginRequest)
		if (!userSession)
			throw new HttpUnauthorizedException("Username and password combination incorrect.")
		return userSession
	}

	@Get("logout")
	@ApiOperation({
		summary: "Log out the current user"
	})
	@ApiBearerAuth(bearerAuthName)
	@UseGuards(AuthGuard)
	@ApiOkResponse()
	@ApiForbiddenResponse({ type: HttpForbiddenException })
	public async logout(@Req() request: UserDatabaseApiRequestAuthenticated) {
		await this.authService.logout(request.userSession.token)
	}

	@Get("sessions")
	@RequireRoles([UserDatabaseRole.Admin])
	@ApiOperation({
		summary: "Get all currently active sessions",
		description: `Return a list of all active session including their tokens (for debugging). Requires admin role.`
	})
	@ApiOkResponse({ type: UserSession })
	@ApiBearerAuth(bearerAuthName)
	@UseGuards(AuthGuard)
	@ApiForbiddenResponse({ type: HttpForbiddenException })
	@ApiUnauthorizedResponse({ type: HttpUnauthorizedException })
	public async getActiveSessions() {
		return this.storageService.getUserSessions()
	}

	@Get("log-everyone-out")
	@RequireRoles([UserDatabaseRole.Admin])
	@ApiOperation({
		summary: "Log out every currently logged in user except the current one"
	})
	@ApiBearerAuth(bearerAuthName)
	@UseGuards(AuthGuard)
	@ApiOkResponse({ type: LogEveryoneOutResponse })
	public async logEveryoneOut(@Req() { userSession }: UserDatabaseApiRequestAuthenticated) {
		const removedSessions: UserSession[] = []
		await this.storageService.setUserSessions((sessions) => {
			const validSessions: UserSession[] = []
			for (const session of sessions) {
				if (session.token !== userSession.token) {
					removedSessions.push(session)
					continue
				}
				validSessions.push(session)
			}
			return validSessions
		})
		return new LogEveryoneOutResponse({ removedSessions })
	}
}
