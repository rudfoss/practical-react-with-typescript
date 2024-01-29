import { Module } from "@nestjs/common"

import { AuthModule } from "../auth"
import { StoreModule } from "../store"

import { AppController } from "./AppController"

@Module({
	imports: [StoreModule, AuthModule],
	controllers: [AppController],
	providers: []
})
export class AppModule {}
