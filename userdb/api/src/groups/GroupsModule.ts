import { Module } from "@nestjs/common"

import { AuthModule } from "../auth"
import { StorageModule } from "../storage"

import { GroupsController } from "./GroupsController"

@Module({
	imports: [AuthModule, StorageModule],
	controllers: [GroupsController]
})
export class GroupsModule {}
