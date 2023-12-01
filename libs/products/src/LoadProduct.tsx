import { useQuery } from "@tanstack/react-query"

import { ProductsControllerClient } from "@prwt/generated/store-api"

import { ProductDetails } from "./ProductDetails"

export interface LoadProductProps {
	productId: string
}

export const LoadProduct = ({ productId }: LoadProductProps) => {
	const {
		data: product,
		isError,
		isFetching
	} = useQuery({
		queryKey: ["products", "detail", productId],
		queryFn: () => {
			const client = new ProductsControllerClient("http://localhost:4210")
			return client.getProduct(productId)
		}
	})

	if (isError) {
		return <p>Oops... it failed</p>
	}

	if (isFetching) {
		return <p>Loading...</p>
	}

	if (!product) {
		return <p>Something happened</p>
	}

	return <ProductDetails product={product} />
}
