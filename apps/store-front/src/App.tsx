import { PromotedProducts } from "./PromotedProducts"
import { productResults } from "./products"

export const App = () => {
	return <PromotedProducts products={productResults.results.slice(0, 3)} />
}
