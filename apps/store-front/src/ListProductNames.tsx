import { ReactNode } from "react"

import { Product } from "./products"

export interface ListProductNamesProps {
	products: Product[]
}

export const ListProductNames = ({ products }: ListProductNamesProps) => {
	return (
		<>
			<h3>List of products</h3>
			<p>There are {products.length} product(s)</p>
			<ul>
				{products.map((product) => (
					<li key={product.id}>{product.title}</li>
				))}
			</ul>
		</>
	)
}
