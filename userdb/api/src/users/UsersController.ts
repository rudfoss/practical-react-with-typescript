import { Controller, Get, Inject, Param, Req, UseGuards } from "@nestjs/common"
import {
	ApiBearerAuth,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags
} from "@nestjs/swagger"

import { UserDbApiRequestAuthenticated } from "../RequestReply"
import { AuthGuard, RequireRoles, bearerAuthName } from "../auth"
import { HttpNotFoundException } from "../httpExceptions"
import { User, UserRole } from "../models"
import { StorageService, StorageServiceKey } from "../storage"

@Controller("")
@ApiTags("Users")
export class UsersController {
	public constructor(@Inject(StorageServiceKey) protected storageService: StorageService) {}

	@Get("user")
	@ApiOperation({
		summary: "Get user information about the currently logged in user"
	})
	@ApiBearerAuth(bearerAuthName)
	@UseGuards(AuthGuard)
	@ApiOkResponse({ type: User })
	public async GetSelf(@Req() request: UserDbApiRequestAuthenticated) {
		return request.user
	}

	@Get("users")
	@ApiOperation({
		summary: "Get all users"
	})
	@ApiBearerAuth(bearerAuthName)
	@UseGuards(AuthGuard)
	@RequireRoles([UserRole.UserReporter])
	@ApiOkResponse({ type: User, isArray: true })
	public async getUsers() {
		const usersWithPassword = await this.storageService.getUsers()
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		return usersWithPassword.map(({ password, ...user }) => user)
	}

	@Get("users/:userId")
	@ApiOperation({
		summary: "Get information about a specific user"
	})
	@ApiOkResponse({ type: User })
	@ApiBearerAuth(bearerAuthName)
	@UseGuards(AuthGuard)
	@RequireRoles([UserRole.UserReporter])
	@ApiNotFoundResponse({ description: "No user found", type: HttpNotFoundException })
	public async getUser(@Param("userId") userId: string) {
		const allUsers = await this.storageService.getUsers()
		const user = allUsers.find(({ id }) => id === userId)
		if (!user) throw new HttpNotFoundException(`No user found with the id ${userId}`)
		return user
	}
}
