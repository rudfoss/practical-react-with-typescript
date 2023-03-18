import { Module } from "@nestjs/common"

import { AppController } from "./AppController"

@Module({
	controllers: [AppController],
	providers: []
})
export class AppModule {}
