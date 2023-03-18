import { Controller, Get } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"

@Controller("groups")
@ApiTags("Groups")
export class GroupsController {
	@Get()
	public async getGroups() {
		return []
	}
}
