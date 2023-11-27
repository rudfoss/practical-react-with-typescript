import {
	Body,
	Controller,
	Get,
	Inject,
	NotFoundException,
	Param,
	Post,
	Query,
	Res,
	StreamableFile
} from "@nestjs/common"
import {
	ApiBody,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags
} from "@nestjs/swagger"
import { createZodDto } from "@anatine/zod-nestjs"
import { extendApi } from "@anatine/zod-openapi"
import {
	GetProductsOptions as GetProductsOptionsModel,
	ProductsService
} from "./ProductsService"
import {
	UpsertProduct as UpsertProductModel,
	Product as ProductModel
} from "./data"
import { createReadStream } from "fs"
import { HttpProblemResponse } from "../exceptions"
import { StoreApiReply } from "../RequestReply"

class GetProductsOptions extends createZodDto(
	extendApi(GetProductsOptionsModel)
) {}
class Product extends createZodDto(extendApi(ProductModel)) {}
class UpsertProduct extends createZodDto(extendApi(UpsertProductModel)) {}

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
		type: Product,
		isArray: true
	})
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

	@Get(":productId/image")
	@ApiOperation({
		summary: "Get the image for a product if one is assigned"
	})
	@ApiNotFoundResponse({
		description: "No image exists for the provided product ID",
		type: HttpProblemResponse
	})
	public async getImage(
		@Param("productId") productId: string,
		@Res({ passthrough: true }) res: StoreApiReply
	): Promise<StreamableFile | undefined> {
		const product = await this.productsService.getProduct(productId)
		if (!product) throw new NotFoundException()

		const imageFile = await this.productsService.getProductImageFile(
			product.image
		)
		if (!imageFile) throw new NotFoundException()

		return new StreamableFile(createReadStream(imageFile.path), {
			type: imageFile.mimeType
		})
	}

	@Post()
	@ApiOperation({
		summary: "Create or update a product",
		description:
			"This endpoints allows creating new products as well as updating existing ones. If the body contains an `id` an existing product will be updated or, if the product does not exist, a not-found error is thrown"
	})
	@ApiBody({
		description: UpsertProductModel.description,
		type: UpsertProduct
	})
	@ApiCreatedResponse({
		description: "The complete updated or created product.",
		status: 200,
		type: Product
	})
	@ApiNotFoundResponse({
		type: HttpProblemResponse
	})
	public async upsertProduct(@Body() body: UpsertProduct) {
		return this.productsService.getProduct("1")
	}
}
