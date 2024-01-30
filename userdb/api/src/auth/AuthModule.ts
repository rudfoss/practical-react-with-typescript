import { Module } from "@nestjs/common"

import { StorageModule } from "../storage"

import { AuthController } from "./AuthController"
import { AuthService } from "./AuthService"
import { AuthUserController } from "./AuthUserController"

@Module({
	imports: [StorageModule],
	providers: [AuthService],
	controllers: [AuthController, AuthUserController],
	exports: [AuthService]
})
export class AuthModule {}
