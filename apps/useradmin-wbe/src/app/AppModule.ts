import { Module } from "@nestjs/common"

import { AuthModule } from "../auth"
import { StoreModule } from "../store"
import { UserAdminModule } from "../userAdmin"

import { AppController } from "./AppController"

@Module({
	imports: [UserAdminModule, StoreModule, AuthModule],
	controllers: [AppController],
	providers: []
})
export class AppModule {}
