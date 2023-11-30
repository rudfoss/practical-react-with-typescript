import { useState } from "react"

import { ListProductNames } from "./ListProductNames"
import { Product, productResults } from "./products"

export const App = () => {
	const [products, setProducts] = useState<Product[]>(productResults.results)

	const onDelete = (productToDelete: Product) => {
		setProducts(products.filter((product) => product.id !== productToDelete.id))
	}

	return <ListProductNames products={products} onDelete={onDelete} />
}
