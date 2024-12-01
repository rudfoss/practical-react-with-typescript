import { Controller, Get, Inject, Query, Req, UseGuards } from "@nestjs/common"
import {
	ApiBearerAuth,
	ApiForbiddenResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
	ApiUnauthorizedResponse
} from "@nestjs/swagger"

import { UserDatabaseApiRequestAuthenticated as UserDatabaseApiRequestAuthenticated } from "../RequestReply"
import { HttpForbiddenException, HttpUnauthorizedException } from "../httpExceptions"
import { UserInformation, UserSession } from "../models"

import { AuthGuard } from "./AuthGuard"
import { AuthService } from "./AuthService"
import { RefreshSessionQuery } from "./RefreshSessionQuery"
import { bearerAuthName } from "./authConstants"

@Controller("auth")
@ApiTags("Authenticated User")
export class AuthUserController {
	public constructor(@Inject(AuthService) protected authService: AuthService) {}

	@Get("session")
	@ApiOperation({
		summary: "Get the current users active session",
		description:
			"Returns full session information for the current user if the session is not expired. Can also be used to refresh the session, though doing so will create a new session token and cause the old token to expire."
	})
	@ApiOkResponse({ type: UserSession })
	@ApiBearerAuth(bearerAuthName)
	@UseGuards(AuthGuard)
	@ApiForbiddenResponse({ type: HttpForbiddenException })
	@ApiUnauthorizedResponse({ type: HttpUnauthorizedException })
	public async getSession(
		@Query() { refresh = "false" }: RefreshSessionQuery,
		@Req() request: UserDatabaseApiRequestAuthenticated
	) {
		const doRefresh = refresh === "true"
		if (doRefresh) {
			return await this.authService.createSession(request.userSession.userId, request.userSession)
		}
		return request.userSession
	}

	@Get("user")
	@ApiOperation({
		summary: "Get user information about the currently logged in user"
	})
	@ApiBearerAuth(bearerAuthName)
	@UseGuards(AuthGuard)
	@ApiOkResponse({ type: UserInformation })
	@ApiForbiddenResponse({ type: HttpForbiddenException })
	@ApiUnauthorizedResponse({ type: HttpUnauthorizedException })
	public async getCurrentUser(@Req() request: UserDatabaseApiRequestAuthenticated) {
		return request.userInformation
	}
}
