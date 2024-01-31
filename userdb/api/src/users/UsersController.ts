import { Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from "@nestjs/common"
import {
	ApiBearerAuth,
	ApiForbiddenResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
	ApiUnauthorizedResponse
} from "@nestjs/swagger"

import { AuthGuard, RequireRoles, bearerAuthName } from "../auth"
import { AuthService } from "../auth/AuthService"
import {
	HttpForbiddenException,
	HttpNotFoundException,
	HttpUnauthorizedException
} from "../httpExceptions"
import { User, UserDbRole } from "../models"
import { StorageService, StorageServiceKey } from "../storage"

@Controller("users")
@ApiTags("Users")
export class UsersController {
	public constructor(
		@Inject(AuthService) protected authService: AuthService,
		@Inject(StorageServiceKey) protected storageService: StorageService
	) {}

	@Get()
	@ApiOperation({
		summary: "Get all users"
	})
	@ApiBearerAuth(bearerAuthName)
	@UseGuards(AuthGuard)
	@RequireRoles([UserDbRole.User, UserDbRole.UserAdmin])
	@ApiOkResponse({ type: User, isArray: true })
	public async getUsers() {
		const usersWithPassword = await this.storageService.getUsers()
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		return usersWithPassword.map(({ password, ...user }) => user)
	}

	@Get(":userId")
	@ApiOperation({
		summary: "Get information about a specific user"
	})
	@ApiOkResponse({ type: User })
	@ApiBearerAuth(bearerAuthName)
	@UseGuards(AuthGuard)
	@RequireRoles([UserDbRole.User, UserDbRole.UserAdmin])
	@ApiNotFoundResponse({ description: "No user found", type: HttpNotFoundException })
	@ApiForbiddenResponse({ type: HttpForbiddenException })
	@ApiUnauthorizedResponse({ type: HttpUnauthorizedException })
	public async getUser(@Param("userId") userId: string) {
		const allUsers = await this.storageService.getUsers()
		const user = allUsers.find(({ id }) => id === userId)
		if (!user) throw new HttpNotFoundException(`No user found with the id ${userId}`)
		return user
	}

	@Post()
	@RequireRoles([UserDbRole.UserAdmin])
	@ApiOperation({
		summary: "Create a new user in the system"
	})
	@ApiBearerAuth(bearerAuthName)
	@UseGuards(AuthGuard)
	@ApiForbiddenResponse({ type: HttpForbiddenException })
	@ApiUnauthorizedResponse({ type: HttpUnauthorizedException })
	public async createUser() {}

	@Put()
	@RequireRoles([UserDbRole.UserAdmin])
	@ApiOperation({
		summary: "Update an existing user."
	})
	@ApiBearerAuth(bearerAuthName)
	@UseGuards(AuthGuard)
	@ApiForbiddenResponse({ type: HttpForbiddenException })
	@ApiUnauthorizedResponse({ type: HttpUnauthorizedException })
	public async updateUser() {}

	@Delete()
	@RequireRoles([UserDbRole.UserAdmin])
	@ApiOperation({
		summary: "Delete the specified user."
	})
	@ApiBearerAuth(bearerAuthName)
	@UseGuards(AuthGuard)
	@ApiForbiddenResponse({ type: HttpForbiddenException })
	@ApiUnauthorizedResponse({ type: HttpUnauthorizedException })
	public async deletUser() {}
}
