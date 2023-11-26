import {
	Controller,
	Get,
	HttpException,
	Inject,
	NotFoundException,
	Param,
	Query,
	Res,
	StreamableFile
} from "@nestjs/common"
import {
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags
} from "@nestjs/swagger"
import { createZodDto } from "@anatine/zod-nestjs"
import { extendApi } from "@anatine/zod-openapi"
import { GetProductsOptions, ProductsService } from "./ProductsService"
import { Product } from "./data"
import { createReadStream } from "fs"
import { HttpProblemResponse } from "../exceptions"
import { StoreApiReply } from "../RequestReply"

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
	public async listAll(@Query() query: GetProductsOptionsQuery) {
		return this.productsService.getProducts(query)
	}

	@Get(":productId")
	@ApiOkResponse({
		type: ProductResponse
	})
	@ApiNotFoundResponse({
		description: "No such product exists",
		type: HttpProblemResponse
	})
	public async getProduct(@Param("productId") productId: string) {
		const productIdNum = parseInt(productId)
		const product = await this.productsService.getProduct(productIdNum)
		if (!product) throw new NotFoundException()
		return product
	}

	@Get(":productId/image")
	@ApiNotFoundResponse({
		description: "No image exists for the provided product ID",
		type: HttpProblemResponse
	})
	public async getImage(
		@Param("productId") productId: string,
		@Res({ passthrough: true }) res: StoreApiReply
	): Promise<StreamableFile | undefined> {
		const productIdNum = parseInt(productId)
		const product = await this.productsService.getProduct(productIdNum)
		if (!product) throw new NotFoundException()

		const imageFile = await this.productsService.getProductImageFile(
			product.image
		)
		if (!imageFile) throw new NotFoundException()

		return new StreamableFile(createReadStream(imageFile.path), {
			type: imageFile.mimeType
		})
	}
}
