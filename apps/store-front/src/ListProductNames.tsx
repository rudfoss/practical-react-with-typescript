import { useState } from "react"

import { Product } from "./products"

export interface ListProductNamesProps {
	products: Product[]
}

export const ListProductNames = ({ products }: ListProductNamesProps) => {
	const [selectedProduct, setSelectedProduct] = useState<{
		product: Product
		idx: number
	}>()

	const selectProduct = (product: Product, idx: number) => () => {
		setSelectedProduct({ product, idx })
	}

	return (
		<>
			<h3>List of products</h3>
			<p>There are {products.length} product(s)</p>
			{selectedProduct && (
				<p>
					<strong>Selected product {selectedProduct.idx}:</strong>{" "}
					{selectedProduct.product.title}
				</p>
			)}
			<ul>
				{products.map((product, idx) => (
					<li
						key={product.id}
						onClick={selectProduct(product, idx)}
						style={{ cursor: "pointer" }}
					>
						{product.title}
					</li>
				))}
			</ul>
		</>
	)
}
