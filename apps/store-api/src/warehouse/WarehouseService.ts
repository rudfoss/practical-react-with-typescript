import { z } from "zod"

export const WarehouseService = Symbol("WarehouseService")

export const InventoryResult = z.object({
	productId: z.string(),
	count: z.number().min(0).max(Infinity)
})
export type InventoryResult = z.infer<typeof InventoryResult>

export interface WarehouseService {
	getInventoryForProduct(
		productId: string
	): Promise<InventoryResult | undefined>
	setInventoryForProduct(
		productId: string,
		count: number
	): Promise<InventoryResult>
}
