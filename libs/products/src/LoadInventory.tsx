import { useQuery } from "@tanstack/react-query"

import { WarehouseControllerClient } from "@prwt/generated/store-api"

export interface LoadInventoryProps {
	productId: string
}

export const LoadInventory = ({ productId }: LoadInventoryProps) => {
	const {
		data: inventory,
		isError,
		isFetching
	} = useQuery({
		queryKey: ["products", "inventory", productId],
		staleTime: 1000 * 10,
		queryFn: () => {
			const client = new WarehouseControllerClient("http://localhost:4210")
			return client.getInventory(productId)
		}
	})

	if (isError) {
		return <p>Oops... it failed</p>
	}

	if (isFetching) {
		return <p>Loading...</p>
	}

	if (!inventory) {
		return <p>Something happened</p>
	}

	return inventory.count
}
