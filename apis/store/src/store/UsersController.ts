import { Controller, Get, Inject } from "@nestjs/common"
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger"

import { User } from "../models"
import { StorageService, StorageServiceKey } from "../storage"

@Controller("/users")
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
}
