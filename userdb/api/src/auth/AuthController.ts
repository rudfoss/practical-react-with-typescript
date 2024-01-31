import {
	Body,
	Controller,
	Get,
	Inject,
	NotFoundException,
	Post,
	Req,
	UseGuards
} from "@nestjs/common"
import {
	ApiBearerAuth,
	ApiForbiddenResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
	ApiUnauthorizedResponse
} from "@nestjs/swagger"

import { merge } from "@react-workshop/utils"

import { UserDbApiRequestAuthenticated } from "../RequestReply"
import {
	HttpForbiddenException,
	HttpNotFoundException,
	HttpUnauthorizedException
} from "../httpExceptions"
import { UserDbRole, UserSession } from "../models"
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
		summary: "Log a user in and get an active session."
	})
	@ApiOkResponse({ type: UserSession })
	@ApiNotFoundResponse({ type: HttpNotFoundException })
	public async login(@Body() loginRequest: LoginRequest) {
		const userSession = await this.authService.login(loginRequest)
		if (!userSession) throw new NotFoundException("Username and password combination incorrect.")
		return userSession
	}

	@Get("sessions")
	@RequireRoles([UserDbRole.Admin])
	@ApiOperation({
		summary: "Get all currently active sessions",
		description: `Return a list of all active session including their tokens (for debugging). Requires admin role.`
	})
	@ApiOkResponse({ type: UserSession })
	@ApiBearerAuth(bearerAuthName)
	@UseGuards(AuthGuard)
	@ApiForbiddenResponse({ type: HttpForbiddenException })
	@ApiUnauthorizedResponse({ type: HttpUnauthorizedException })
	public async getActiveSession() {
		return this.storageService.getUserSessions()
	}

	@Get("logout")
	@ApiOperation({
		summary: "Log out the current user"
	})
	@ApiBearerAuth(bearerAuthName)
	@UseGuards(AuthGuard)
	@ApiOkResponse({ type: "ok" })
	@ApiForbiddenResponse({ type: HttpForbiddenException })
	public async logout(@Req() request: UserDbApiRequestAuthenticated) {
		await this.authService.logout(request.userSession.token)
		return "ok"
	}

	@Get("log-everyone-out")
	@RequireRoles([UserDbRole.Admin])
	@ApiOperation({
		summary: "Log out every currently logged in user except the current one."
	})
	@ApiBearerAuth(bearerAuthName)
	@UseGuards(AuthGuard)
	@ApiOkResponse({ type: LogEveryoneOutResponse })
	public async logEveryoneOut(@Req() { userSession }: UserDbApiRequestAuthenticated) {
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
		return merge(new LogEveryoneOutResponse(), {
			removedSessions
		})
	}
}
