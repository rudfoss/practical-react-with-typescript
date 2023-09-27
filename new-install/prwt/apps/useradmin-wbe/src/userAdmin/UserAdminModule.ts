import { Module } from "@nestjs/common"

import { StoreModule } from "../store"

import { GroupsController } from "./GroupsController"
import { UsersController } from "./UsersController"

@Module({
	imports: [StoreModule],
	controllers: [UsersController, GroupsController]
})
export class UserAdminModule {}
