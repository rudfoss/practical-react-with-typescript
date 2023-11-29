import { Module } from "@nestjs/common"

import { InMemoryProductsService } from "./InMemoryProductsService"
import { ProductsController } from "./ProductsController"
import { ProductsService } from "./ProductsService"

@Module({
	providers: [
		{
			provide: ProductsService,
			useClass: InMemoryProductsService
		}
	],
	controllers: [ProductsController],
	exports: [ProductsService]
})
export class ProductsModule {}
