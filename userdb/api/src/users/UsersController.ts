import { Controller, Get, Inject, Param, UseGuards } from "@nestjs/common"
import {
	ApiBearerAuth,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags
} from "@nestjs/swagger"

import { AuthGuard, RequireRoles, bearerAuthName } from "../auth"
import { HttpNotFoundException } from "../httpExceptions"
import { User, UserDbRole } from "../models"
import { StorageService, StorageServiceKey } from "../storage"

@Controller("users")
@ApiTags("Users")
export class UsersController {
	public constructor(@Inject(StorageServiceKey) protected storageService: StorageService) {}

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
	public async getUser(@Param("userId") userId: string) {
		const allUsers = await this.storageService.getUsers()
		const user = allUsers.find(({ id }) => id === userId)
		if (!user) throw new HttpNotFoundException(`No user found with the id ${userId}`)
		return user
	}
}
