import { Module } from "@nestjs/common"

import { StorageModule } from "../storage/StorageModule"

import { ProductsController } from "./ProductsController"

@Module({
	imports: [StorageModule],
	controllers: [ProductsController],
	exports: []
})
export class StoreModule {}
