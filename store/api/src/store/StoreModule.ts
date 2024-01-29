import { Module } from "@nestjs/common"

import { StorageModule } from "../storage"

import { ProductsController } from "./ProductsController"
import { UsersController } from "./UsersController"

@Module({
	imports: [StorageModule],
	controllers: [ProductsController, UsersController],
	exports: []
})
export class StoreModule {}
