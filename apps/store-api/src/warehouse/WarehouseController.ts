import {
	Body,
	Controller,
	Get,
	Inject,
	NotFoundException,
	Param,
	Put,
	Query,
	UseGuards
} from "@nestjs/common"
import {
	InventoryResult as InventoryResultModel,
	WarehouseService
} from "./WarehouseService"
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
import { BadRequestHttpProblem, HttpProblemResponse } from "../exceptions"
import { ZodGuard, ZodGuardBody } from "../ZodGuard"
import { z } from "zod"
import { bearerAuthName } from "../auth"
import { AuthGuard, RequireRoles } from "../auth"

class InventoryResult extends createZodDto(extendApi(InventoryResultModel)) {}

@Controller("warehouse")
@ApiTags("Warehouse")
@UseGuards(ZodGuard)
@ApiBadRequestResponse({
	description: BadRequestHttpProblem.zodSchema.description,
	type: BadRequestHttpProblem
})
export class WarehouseController {
	public constructor(
		@Inject(WarehouseService)
		protected readonly warehouseService: WarehouseService
	) {}

	@Get("inventory/:productId")
	@ApiOperation({
		summary: "Get the inventory count for a product"
	})
	@ApiOkResponse({
		description: "The result of the inventory ",
		type: InventoryResult
	})
	@ApiNotFoundResponse({
		description: "No inventory for the specified product",
		type: HttpProblemResponse
	})
	public async getInventory(@Param("productId") productId: string) {
		const inventory = await this.warehouseService.getInventoryForProduct(
			productId
		)
		if (!inventory)
			throw new NotFoundException(
				`Product with id ${productId} has no inventory`
			)
		return inventory
	}

	@Put("inventory/:productId")
	@ApiOperation({
		description: "The role warehouseAdmin is required to use this endpoint.",
		summary: "Set the new inventory count for a product"
	})
	@ApiOkResponse({
		description: "The new inventory count",
		type: InventoryResult
	})
	@ZodGuardBody(z.number().min(0).max(Infinity))
	@ApiBearerAuth(bearerAuthName)
	@UseGuards(AuthGuard)
	@RequireRoles(["warehouseAdmin"])
	public async updateInventory(
		@Param("productId") productId: string,
		@Body() count: number
	) {
		await this.warehouseService.setInventoryForProduct(productId, count)
		return await this.getInventory(productId)
	}
}
