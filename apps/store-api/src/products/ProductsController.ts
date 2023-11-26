import { Controller, Get, Inject, Query } from "@nestjs/common"
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger"
import { createZodDto } from "@anatine/zod-nestjs"
import { extendApi } from "@anatine/zod-openapi"
import { GetProductsOptions, ProductsService } from "./ProductsService"
import { Product } from "./data"

class GetProductsOptionsQuery extends createZodDto(
	extendApi(GetProductsOptions)
) {}
class ProductResponse extends createZodDto(extendApi(Product)) {}

@Controller("products")
@ApiTags("Products")
export class ProductsController {
	public constructor(
		@Inject(ProductsService) protected readonly productsService: ProductsService
	) {}

	@Get()
	@ApiOperation({
		summary: "Get all products"
	})
	@ApiOkResponse({
		type: ProductResponse,
		isArray: true
	})
	public listAll(@Query() query: GetProductsOptionsQuery) {
		return this.productsService.getProducts(query)
	}
}
