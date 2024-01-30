import {
	Body,
	Controller,
	Get,
	Inject,
	NotFoundException,
	Post,
	Query,
	Req,
	UseGuards
} from "@nestjs/common"
import {
	ApiBearerAuth,
	ApiForbiddenResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiProperty,
	ApiTags,
	ApiUnauthorizedResponse
} from "@nestjs/swagger"
import { IsEnum, IsOptional } from "class-validator"

import { UserDbApiRequestAuthenticated } from "../RequestReply"
import {
	HttpForbiddenException,
	HttpNotFoundException,
	HttpUnauthorizedException
} from "../httpExceptions"
import { UserRole, UserSession } from "../models"
import { StorageService, StorageServiceKey } from "../storage"

import { AuthGuard, RequireRoles } from "./AuthGuard"
import { AuthService } from "./AuthService"
import { LoginRequest } from "./LoginRequest"
import { bearerAuthName } from "./authConstants"

class RefreshSessionQuery {
	@ApiProperty({ required: false, enum: ["true", "false"] })
	@IsEnum(["true", "false"], { message: `Value must be either "true" or "false" if set.` })
	@IsOptional()
	refresh?: string
}

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

	@Get("session")
	@ApiOperation({
		summary: "Get the current users active session",
		description: "Return the session for the current user and optionally renew it."
	})
	@ApiOkResponse({ type: UserSession })
	@ApiBearerAuth(bearerAuthName)
	@UseGuards(AuthGuard)
	@ApiForbiddenResponse({ type: HttpForbiddenException })
	@ApiUnauthorizedResponse({ type: HttpUnauthorizedException })
	public async getSession(
		@Query() { refresh = "false" }: RefreshSessionQuery,
		@Req() request: UserDbApiRequestAuthenticated
	) {
		const doRefresh = refresh === "true"
		if (doRefresh) {
			return await this.authService.createNewSession(request.user!.id, request.userSession!)
		}
		return request.userSession
	}

	@Get("sessions")
	@ApiOperation({
		summary: "Get all currently active sessions",
		description: `Return a list of all active session including their tokens (for debugging). Requires admin role.

Role required: **Admin**`
	})
	@ApiOkResponse({ type: UserSession })
	@ApiBearerAuth(bearerAuthName)
	@UseGuards(AuthGuard)
	@RequireRoles([UserRole.Admin])
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
}
