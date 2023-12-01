import { PromotedProducts, productResults } from "@prwt/products"

export const HomePage = () => {
	return <PromotedProducts products={productResults.results.slice(0, 3)} />
}
