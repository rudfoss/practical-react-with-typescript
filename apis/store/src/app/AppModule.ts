import { Module } from "@nestjs/common"

import { StoreModule } from "../store"

import { AppController } from "./AppController"

@Module({
	imports: [StoreModule],
	controllers: [AppController],
	providers: []
})
export class AppModule {}
