import { PromotedProducts } from "../PromotedProducts"
import { productResults } from "../products"

export const HomePage = () => {
	return <PromotedProducts products={productResults.results.slice(0, 3)} />
}
