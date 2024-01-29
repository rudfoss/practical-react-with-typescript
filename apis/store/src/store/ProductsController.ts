import { Controller, Get, Inject } from "@nestjs/common"
import { ApiOkResponse, ApiTags } from "@nestjs/swagger"

import { Product } from "../models"
import { StorageService, StorageServiceKey } from "../storage/StorageService"

@Controller("/products")
@ApiTags("Products")
export class ProductsController {
	public constructor(@Inject(StorageServiceKey) protected storageService: StorageService) {}

	@Get()
	@ApiOkResponse({ type: Product, isArray: true })
	async getProducts() {
		return await this.storageService.getProducts()
	}
}
