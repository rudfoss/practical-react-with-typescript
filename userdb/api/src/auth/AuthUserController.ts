import { Controller, Get, Inject, Query, Req, UseGuards } from "@nestjs/common"
import {
	ApiBearerAuth,
	ApiForbiddenResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
	ApiUnauthorizedResponse
} from "@nestjs/swagger"

import { UserDbApiRequestAuthenticated } from "../RequestReply"
import { HttpForbiddenException, HttpUnauthorizedException } from "../httpExceptions"
import { Group, User, UserSession } from "../models"

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

	@Get("user")
	@ApiOperation({
		summary: "Get user information about the currently logged in user"
	})
	@ApiBearerAuth(bearerAuthName)
	@UseGuards(AuthGuard)
	@ApiOkResponse({ type: User })
	public async getCurrentUser(@Req() request: UserDbApiRequestAuthenticated) {
		return request.user
	}

	@Get("groups")
	@ApiOperation({
		summary: "Get all groups the current user is a member of"
	})
	@ApiBearerAuth(bearerAuthName)
	@UseGuards(AuthGuard)
	@ApiOkResponse({ type: Group, isArray: true })
	public async getCurrentUserGroups(@Req() request: UserDbApiRequestAuthenticated) {
		return await this.authService.getUserGroups(request.user)
	}
}
