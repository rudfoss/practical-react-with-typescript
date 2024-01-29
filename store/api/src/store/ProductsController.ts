import { Controller, Get, Inject, Param } from "@nestjs/common"
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger"

import { HttpNotFoundException } from "../httpExceptions"
import { Product, ProductRating } from "../models"
import { StorageService, StorageServiceKey } from "../storage"

@Controller("products")
@ApiTags("Products")
export class ProductsController {
	public constructor(@Inject(StorageServiceKey) protected storageService: StorageService) {}

	@Get()
	@ApiOperation({
		summary: "Get all products"
	})
	@ApiOkResponse({ type: Product, isArray: true })
	public async getProducts() {
		return await this.storageService.getProducts()
	}

	@Get(":productId")
	@ApiOperation({
		summary: "Get a specific product"
	})
	@ApiOkResponse({ type: Product })
	@ApiNotFoundResponse({ description: "No product found", type: HttpNotFoundException })
	public async getProduct(@Param("productId") productId: string) {
		const products = await this.getProducts()
		const product = products.find(({ id }) => productId === id)
		if (!product) throw new HttpNotFoundException(`No product with id ${productId} exists`)
		return product
	}

	@Get(":productId/ratings")
	@ApiOperation({
		summary: "Get ratings for a specific product"
	})
	@ApiOkResponse({ type: ProductRating, isArray: true })
	@ApiNotFoundResponse({
		description: "No ratings found for the product",
		type: HttpNotFoundException
	})
	public async getRatings(@Param("productId") productId: string) {
		const allRatings = await this.storageService.getProductRatings()
		const ratings = allRatings.filter(
			({ productId: raitingProductId }) => raitingProductId === productId
		)
		if (!ratings)
			throw new HttpNotFoundException(`No raitings found for the product with id ${productId}`)
		return ratings
	}
}
