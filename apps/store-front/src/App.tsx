import { useState } from "react"

import { ProductsTable } from "./ProductsTable"
import { Product, productResults } from "./products"

export const App = () => {
	const [products, setProducts] = useState<Product[]>(productResults.results)

	const onDelete = (productToDelete: Product) => {
		setProducts(products.filter((product) => product.id !== productToDelete.id))
	}

	return <ProductsTable products={products} onDelete={onDelete} />
}
