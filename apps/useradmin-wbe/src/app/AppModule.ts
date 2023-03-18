import { Module } from "@nestjs/common"

import { StoreModule } from "../store"
import { UserAdminModule } from "../userAdmin"

import { AppController } from "./AppController"

@Module({
	imports: [UserAdminModule, StoreModule],
	controllers: [AppController],
	providers: []
})
export class AppModule {}
