import { ListProductNames } from "./ListProductNames"
import { productResults } from "./products"

export const App = () => {
	return <ListProductNames products={productResults.results} />
}
