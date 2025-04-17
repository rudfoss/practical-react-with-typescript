import { Module } from "@nestjs/common"

import { AuthModule } from "../auth"
import { GroupsModule } from "../groups"
import { StorageModule } from "../storage"
import { UsersModule } from "../users"
import { AppController } from "./App.controller"

@Module({
	imports: [StorageModule, AuthModule, UsersModule, GroupsModule],
	controllers: [AppController],
	providers: []
})
export class AppModule {}
