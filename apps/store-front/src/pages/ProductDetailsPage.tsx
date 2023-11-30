import { useParams } from "react-router-dom"

import { ProductDetails } from "../ProductDetails"
import { productResults } from "../products"

export const ProductDetailsPage = () => {
	const { productId } = useParams<"productId">()
	if (!productId) {
		return <p>No product id param defined.</p>
	}

	const product = productResults.results.find(
		(product) => product.id === productId
	)
	if (!product) {
		return <p>No product found with id {productId}</p>
	}

	return <ProductDetails product={product} />
}
