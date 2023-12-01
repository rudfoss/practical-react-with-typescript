import { createZodDto } from "@anatine/zod-nestjs"
import { extendApi } from "@anatine/zod-openapi"
import {
	Body,
	Controller,
	Get,
	Inject,
	Param,
	Put,
	UseGuards
} from "@nestjs/common"
import {
	ApiBadRequestResponse,
	ApiBearerAuth,
	ApiOkResponse,
	ApiOperation,
	ApiTags
} from "@nestjs/swagger"
import { z } from "zod"

import { ZodGuard, ZodGuardBody } from "../ZodGuard"
import { bearerAuthName } from "../auth"
import { AuthGuard, RequireRoles } from "../auth"
import { BadRequestHttpProblem } from "../exceptions"

import {
	InventoryResult as InventoryResultModel,
	WarehouseService
} from "./WarehouseService"

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
	public async getInventory(
		@Param("productId") productId: string
	): Promise<InventoryResultModel> {
		const inventory = await this.warehouseService.getInventoryForProduct(
			productId
		)
		return {
			productId,
			count: inventory?.count ?? 0
		}
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
	@ZodGuardBody(z.number().min(0))
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
