import { Module } from "@nestjs/common"

import { AuthModule } from "../auth"

import { GroupsController } from "./GroupsController"

@Module({
	imports: [AuthModule],
	controllers: [GroupsController]
})
export class GroupsModule {}
