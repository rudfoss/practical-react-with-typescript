import { Module } from "@nestjs/common"

import { StorageModule } from "../storage"

import { AuthController } from "./AuthController"
import { AuthService } from "./AuthService"

@Module({
	imports: [StorageModule],
	providers: [AuthService],
	controllers: [AuthController],
	exports: [AuthService]
})
export class AuthModule {}
