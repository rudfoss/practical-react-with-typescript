import {
	Body,
	Controller,
	Get,
	HttpCode,
	Inject,
	NotFoundException,
	Param,
	Post,
	Put,
	Query,
	UseGuards
} from "@nestjs/common"
import {
	ApiBadRequestResponse,
	ApiBearerAuth,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags
} from "@nestjs/swagger"
import { createZodDto } from "@anatine/zod-nestjs"
import { extendApi } from "@anatine/zod-openapi"
import {
	GetProductsOptions as GetProductsOptionsModel,
	GetProductsResult as GetProductsResultModel,
	ProductsService
} from "./ProductsService"
import {
	Product as ProductModel,
	NewProduct as NewProductModel,
	UpdateProduct as UpdateProductModel,
	ProductCategory
} from "./Product"
import { BadRequestHttpProblem, HttpProblemResponse } from "../exceptions"
import { ZodGuard, ZodGuardBody, ZodGuardQuery } from "../ZodGuard"
import { AuthGuard, RequireRoles, bearerAuthName } from "../auth"
import { z } from "zod"

class GetProductsOptions extends createZodDto(
	extendApi(GetProductsOptionsModel)
) {}
class GetProductsResult extends createZodDto(
	extendApi(GetProductsResultModel)
) {}
class Product extends createZodDto(extendApi(ProductModel)) {}
class NewProduct extends createZodDto(extendApi(NewProductModel)) {}
class UpdateProduct extends createZodDto(extendApi(UpdateProductModel)) {}

@Controller("products")
@ApiTags("Products")
@UseGuards(ZodGuard)
@ApiBadRequestResponse({
	description: BadRequestHttpProblem.zodSchema.description,
	type: BadRequestHttpProblem
})
export class ProductsController {
	public constructor(
		@Inject(ProductsService) protected readonly productsService: ProductsService
	) {}

	@Get()
	@ApiOperation({
		summary: "Get all products"
	})
	@ApiOkResponse({
		type: GetProductsResult
	})
	@ZodGuardQuery(GetProductsOptions)
	public async listAll(@Query() query: GetProductsOptions) {
		return this.productsService.getProducts(query)
	}

	@Get(":productId")
	@ApiOkResponse({
		type: Product
	})
	@ApiOperation({
		summary: "Get information about a product"
	})
	@ApiNotFoundResponse({
		description: "No such product exists",
		type: HttpProblemResponse
	})
	public async getProduct(@Param("productId") productId: string) {
		const product = await this.productsService.getProduct(productId)
		if (!product) throw new NotFoundException()
		return product
	}

	@Post()
	@ApiOperation({
		summary: "Create a new product"
	})
	@HttpCode(200)
	@ApiOkResponse({
		status: 200,
		description: "The newly created product",
		type: Product
	})
	@ZodGuardBody(NewProduct)
	@ApiBearerAuth(bearerAuthName)
	@UseGuards(AuthGuard)
	@RequireRoles(["productAdmin"])
	public async createProduct(@Body() newProduct: NewProduct) {
		return this.productsService.newProduct(newProduct)
	}

	@Put(":productId")
	@ApiOperation({
		summary: "Update an existing product"
	})
	@ApiNotFoundResponse({
		description: "No product with the provided ID exists",
		type: HttpProblemResponse
	})
	@ApiOkResponse({
		description: "The updated product",
		type: Product
	})
	@ZodGuardBody(UpdateProduct)
	@ApiBearerAuth(bearerAuthName)
	@UseGuards(AuthGuard)
	@RequireRoles(["productAdmin"])
	public async updateProduct(
		@Param("productId") productId: string,
		@Body() updateProduct: UpdateProduct
	) {
		const newProduct = await this.productsService.updateProduct(
			productId,
			updateProduct
		)
		if (!newProduct) {
			throw new NotFoundException(`No product exists with id ${productId}`)
		}

		return newProduct
	}
}
