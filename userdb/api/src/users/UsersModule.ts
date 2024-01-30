import { Module } from "@nestjs/common"

import { AuthModule } from "../auth"
import { StorageModule } from "../storage"

import { UsersController } from "./UsersController"

@Module({
	imports: [StorageModule, AuthModule],
	controllers: [UsersController]
})
export class UsersModule {}
