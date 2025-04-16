import { Module } from "@nestjs/common"

import { AuthModule } from "../auth"

import { UsersController } from "./Users.controller"

@Module({
	imports: [AuthModule],
	controllers: [UsersController]
})
export class UsersModule {}
