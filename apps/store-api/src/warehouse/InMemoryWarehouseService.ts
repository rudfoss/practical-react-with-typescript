import { InventoryResult, WarehouseService } from "./WarehouseService"

export class InMemoryWarehouseService implements WarehouseService {
	protected readonly inventoryCountByProductId = new Map<string, number>()

	public async getInventoryForProduct(
		productId: string
	): Promise<InventoryResult | undefined> {
		const count = this.inventoryCountByProductId.get(productId)
		if (count === undefined) return undefined
		return {
			productId,
			count
		}
	}

	public async setInventoryForProduct(
		productId: string,
		count: number
	): Promise<InventoryResult> {
		this.inventoryCountByProductId.set(productId, Math.max(count, 0))
		return {
			productId,
			count
		}
	}
}
