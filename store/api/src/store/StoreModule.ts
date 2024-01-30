import { Module } from "@nestjs/common"

import { AuthModule } from "../auth"
import { StorageModule } from "../storage"

import { ProductsController } from "./ProductsController"
import { UsersController } from "./UsersController"

@Module({
	imports: [StorageModule, AuthModule],
	controllers: [ProductsController, UsersController],
	exports: []
})
export class StoreModule {}
