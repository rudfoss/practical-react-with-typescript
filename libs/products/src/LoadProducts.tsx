import { useQuery } from "@tanstack/react-query"

import { ProductsControllerClient } from "@prwt/generated/store-api"

import { ProductsTable } from "./ProductsTable"

export const LoadProducts = () => {
	const {
		data: productResults,
		isFetching,
		isError,
		dataUpdatedAt
	} = useQuery({
		queryKey: ["products", "list"],
		queryFn: () => {
			const client = new ProductsControllerClient("http://localhost:4210")
			return client.getProducts()
		}
	})

	if (isFetching) {
		return <p>Loading...</p>
	}

	if (isError) {
		return <p>Oops... something went wrong</p>
	}

	if (!productResults) {
		return <p>This should not have happened. Blame the backend guys!</p>
	}

	return (
		<>
			<p>Last updated: {new Date(dataUpdatedAt).toLocaleString()}</p>
			<ProductsTable products={productResults.results} />
		</>
	)
}
