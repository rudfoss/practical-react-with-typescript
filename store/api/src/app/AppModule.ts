import { Module } from "@nestjs/common"

import { AuthModule } from "../auth"
import { StorageModule } from "../storage"
import { StoreModule } from "../store"

import { AppController } from "./AppController"

@Module({
	imports: [StorageModule, StoreModule, AuthModule],
	controllers: [AppController],
	providers: []
})
export class AppModule {}
