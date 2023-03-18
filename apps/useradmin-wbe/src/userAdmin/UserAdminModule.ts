import { Module } from "@nestjs/common"

import { GroupsController } from "./GroupsController"
import { UsersController } from "./UsersController"

@Module({
	controllers: [UsersController, GroupsController]
})
export class UserAdminModule {}
