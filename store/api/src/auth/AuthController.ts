import {
	Body,
	Controller,
	Get,
	Inject,
	NotFoundException,
	Post,
	Query,
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
import { IsBoolean, IsOptional } from "class-validator"

import {
	HttpForbiddenException,
	HttpNotFoundException,
	HttpUnauthorizedException
} from "../httpExceptions"
import { UserRole, UserSession } from "../models"

import { AuthGuard, RequireRoles } from "./AuthGuard"
import { AuthService } from "./AuthService"
import { LoginRequest } from "./LoginRequest"
import { bearerAuthName } from "./authConstants"

class RefreshSessionQuery {
	@ApiProperty({ required: false })
	@IsBoolean()
	@IsOptional()
	refresh?: boolean
}

@Controller("auth")
@ApiTags("Auth")
export class AuthController {
	public constructor(@Inject(AuthService) protected authService: AuthService) {}

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
	public async getSession(@Query() query: RefreshSessionQuery) {
		return { query }
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
		return this.authService.getUserSessions()
	}

	@Get("logout")
	@ApiOperation({
		summary: "Log out the current user"
	})
	public async logout() {}
}
