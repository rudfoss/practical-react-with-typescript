import { Controller, Get, Inject, Param } from "@nestjs/common"
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger"

import { HttpNotFoundException } from "../httpExceptions"
import { User } from "../models"
import { StorageService, StorageServiceKey } from "../storage"

@Controller("users")
@ApiTags("Users")
export class UsersController {
	public constructor(@Inject(StorageServiceKey) protected storageService: StorageService) {}

	@Get()
	@ApiOperation({
		summary: "Get all users"
	})
	@ApiOkResponse({ type: User, isArray: true })
	public async getUsers() {
		const usersWithPw = await this.storageService.getUsers()
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		return usersWithPw.map(({ password, ...user }) => user)
	}

	@Get(":userId")
	@ApiOkResponse({ type: User })
	@ApiNotFoundResponse({ description: "No user found", type: HttpNotFoundException })
	public async getUser(@Param("id") userId: string) {
		const user = (await this.storageService.getUsers()).find(({ id }) => id === userId)
		if (!user) throw new HttpNotFoundException(`No user found with the id ${userId}`)
		return user
	}
}
