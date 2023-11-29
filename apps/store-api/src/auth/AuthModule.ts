import { Global, Module } from "@nestjs/common"

import { AuthController } from "./AuthController"
import { AuthService } from "./AuthService"

@Global()
@Module({
	providers: [AuthService],
	controllers: [AuthController],
	exports: [AuthService]
})
export class AuthModule {}
