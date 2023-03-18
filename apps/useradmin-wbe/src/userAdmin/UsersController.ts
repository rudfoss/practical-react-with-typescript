import { Controller, Get } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"

@Controller("users")
@ApiTags("Users")
export class UsersController {
	@Get()
	public async getUsers() {
		return []
	}
}
