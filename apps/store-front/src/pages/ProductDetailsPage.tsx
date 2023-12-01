import { useParams } from "react-router-dom"

import { LoadProduct } from "@prwt/products"

export const ProductDetailsPage = () => {
	const { productId } = useParams<"productId">()
	if (!productId) {
		return <p>No product id param defined.</p>
	}

	return <LoadProduct productId={productId} />
}
