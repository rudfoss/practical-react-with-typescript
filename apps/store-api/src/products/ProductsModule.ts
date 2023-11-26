import { Module } from "@nestjs/common"
import { ProductsController } from "./ProductsController"
import { InMemoryProductsService } from "./InMemoryProductsService"
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
