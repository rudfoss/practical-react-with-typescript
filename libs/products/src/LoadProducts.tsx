import { useQuery } from "@tanstack/react-query"

import { ProductsTable } from "./ProductsTable"
import { ProductResults } from "./products"

const fetchProducts = async () => {
	const response = await fetch("http://localhost:4210/products")
	const products = await response.json()
	return products as ProductResults
}

export const LoadProducts = () => {
	const {
		data: productResults,
		isFetching,
		isError,
		dataUpdatedAt
	} = useQuery({
		queryKey: ["products"],
		queryFn: fetchProducts
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
