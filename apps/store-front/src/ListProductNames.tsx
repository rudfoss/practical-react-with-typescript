import { useMemo, useState } from "react"

import { Product } from "./products"

const getSortDirectionText = (sortDirection?: "asc" | "desc") => {
	switch (sortDirection) {
		case undefined:
			return "none"
		case "asc":
			return "ascending"
		case "desc":
			return "descending"
	}
}

export interface ListProductNamesProps {
	products: Product[]
}

export const ListProductNames = ({ products }: ListProductNamesProps) => {
	const [selectedProduct, setSelectedProduct] = useState<{
		product: Product
		idx: number
	}>()
	const [sortDirection, setSortDirection] = useState<"asc" | "desc">()
	const sortedProducts = useMemo(() => {
		if (!sortDirection) return products

		const presortedProducts = products.slice(0)
		presortedProducts.sort((a, b) => {
			const result = a.title.localeCompare(b.title)
			return sortDirection === "asc" ? result : result * -1
		})

		return presortedProducts
	}, [products, sortDirection])

	const selectProduct = (product: Product, idx: number) => () => {
		setSelectedProduct({ product, idx })
	}
	const toggleSortDirection = () => {
		setSortDirection(sortDirection === "desc" ? "asc" : "desc")
	}

	return (
		<>
			<h3>List of products</h3>
			<p>There are {products.length} product(s)</p>
			<button onClick={toggleSortDirection}>
				Sort direction {getSortDirectionText(sortDirection)}
			</button>
			{selectedProduct && (
				<p>
					<strong>Selected product {selectedProduct.idx}:</strong>{" "}
					{selectedProduct.product.title}
				</p>
			)}
			<ul>
				{sortedProducts.map((product, idx) => (
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
