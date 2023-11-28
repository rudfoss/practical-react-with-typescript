import { Global, Module } from "@nestjs/common"
import { AuthService } from "./AuthService"
import { AuthController } from "./AuthController"

@Global()
@Module({
	providers: [AuthService],
	controllers: [AuthController],
	exports: [AuthService]
})
export class AuthModule {}
