import { Module } from "@nestjs/common"

import { AuthModule } from "../auth"

import { UsersController } from "./UsersController"

@Module({
	imports: [AuthModule],
	controllers: [UsersController]
})
export class UsersModule {}
