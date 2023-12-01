import { useState } from "react"

import { ProductsTable } from "../ProductsTable"
import { Product, productResults } from "../products"

export const ProductsPage = () => {
	const [products, setProducts] = useState(productResults.results)

	const deleteProduct = (productToDelete: Product) => {
		setProducts(products.filter((product) => product.id !== productToDelete.id))
	}

	return <ProductsTable products={products} onDelete={deleteProduct} />
}
