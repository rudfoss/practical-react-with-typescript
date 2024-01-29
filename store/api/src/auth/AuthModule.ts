import { Module } from "@nestjs/common"

import { StorageModule } from "../storage"

import { AuthController } from "./AuthController"
import { AuthService } from "./AuthService"

@Module({
	providers: [AuthService],
	imports: [StorageModule],
	controllers: [AuthController],
	exports: [AuthService]
})
export class AuthModule {}
