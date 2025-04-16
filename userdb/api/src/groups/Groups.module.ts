import { Module } from "@nestjs/common"

import { AuthModule } from "../auth"

import { GroupsController } from "./Groups.controller"

@Module({
	imports: [AuthModule],
	controllers: [GroupsController]
})
export class GroupsModule {}
