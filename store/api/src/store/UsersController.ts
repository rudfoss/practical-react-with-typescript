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
import { User, UserRole } from "../models"
import { StorageService, StorageServiceKey } from "../storage"

@Controller("users")
@ApiTags("Users")
export class UsersController {
	public constructor(@Inject(StorageServiceKey) protected storageService: StorageService) {}

	@Get()
	@ApiOperation({
		summary: "Get all users",
		description: `Return a list of all users

Role required: **Admin**`
	})
	@ApiBearerAuth(bearerAuthName)
	@UseGuards(AuthGuard)
	@ApiOkResponse({ type: User, isArray: true })
	public async getUsers() {
		const usersWithPw = await this.storageService.getUsers()
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		return usersWithPw.map(({ password, ...user }) => user)
	}

	@Get(":userId")
	@ApiOperation({
		description: `Return the user specified by the id

Role required: **Admin**`
	})
	@ApiOkResponse({ type: User })
	@ApiBearerAuth(bearerAuthName)
	@UseGuards(AuthGuard)
	@RequireRoles([UserRole.Admin])
	@ApiNotFoundResponse({ description: "No user found", type: HttpNotFoundException })
	public async getUser(@Param("userId") userId: string) {
		const allUsers = await this.storageService.getUsers()
		const user = allUsers.find(({ id }) => id === userId)
		if (!user) throw new HttpNotFoundException(`No user found with the id ${userId}`)
		return user
	}
}
