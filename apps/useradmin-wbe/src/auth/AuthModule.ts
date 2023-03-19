import { Module } from "@nestjs/common"

import { StoreModule } from "../store"

import { AuthController } from "./AuthController"

@Module({
	imports: [StoreModule],
	controllers: [AuthController]
})
export class AuthModule {}
