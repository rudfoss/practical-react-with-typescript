import { useMemo, useState } from "react"
import { Link } from "react-router-dom"

import { useAuthService } from "@prwt/auth"
import { Product } from "@prwt/generated/store-api"

type SortBy = "title" | "price" | "category" | "rating"
// type X = keyof Pick<Product, "title" | "price" | "category" | "rating">
type SortDirection = "asc" | "desc"

const getSortIcon = (
	expectedSortBy: SortBy,
	sortDirection: SortDirection,
	sortBy?: SortBy
) => {
	if (!sortBy) return ""
	if (sortBy !== expectedSortBy) return ""
	return sortDirection === "asc" ? "⬇️" : "⬆️"
}

export interface ProductsTableProps {
	products: Product[]
	onDelete?: (product: Product) => unknown
}

export const ProductsTable = ({ products, onDelete }: ProductsTableProps) => {
	const { isAuthenticated } = useAuthService()
	const [sortBy, setSortBy] = useState<SortBy>()
	const [sortDirection, setSortDirection] = useState<SortDirection>("asc")

	const sortedProducts = useMemo(() => {
		if (!sortBy) return products
		const productsToSort = products.slice(0)
		productsToSort.sort((a, b) => {
			let result = 0

			switch (sortBy) {
				case "title":
					result = a.title.localeCompare(b.title)
					break
				case "category":
					result = a.category.localeCompare(b.category)
					break
				case "price":
					result = a.price - b.price
					break
				case "rating":
					result = (a?.rating ?? 0) - (b?.rating ?? 0)
					break
			}

			return sortDirection === "asc" ? result : result * -1
		})

		return productsToSort
	}, [products, sortBy, sortDirection])

	const deleteProduct = (product: Product) => () => {
		onDelete?.(product)
	}

	const changeSortBy = (newSortBy: SortBy) => () => {
		if (sortBy === newSortBy) {
			setSortDirection(sortDirection === "asc" ? "desc" : "asc")
			return
		}
		setSortBy(newSortBy)
		setSortDirection("asc")
	}

	return (
		<table>
			<thead>
				<tr>
					<th onClick={changeSortBy("title")}>
						Title {getSortIcon("title", sortDirection, sortBy)}
					</th>
					<th onClick={changeSortBy("price")}>
						Price {getSortIcon("price", sortDirection, sortBy)}
					</th>
					<th onClick={changeSortBy("category")}>
						Category {getSortIcon("category", sortDirection, sortBy)}
					</th>
					<th onClick={changeSortBy("rating")}>
						Rating {getSortIcon("rating", sortDirection, sortBy)}
					</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{sortedProducts.map((product) => (
					<tr key={product.id}>
						<td>
							<Link to={`/products/${product.id}`}>{product.title}</Link>
						</td>
						<td>{product.price}</td>
						<td>{product.category}</td>
						<td>{product.rating}</td>
						<td>
							<button
								onClick={deleteProduct(product)}
								disabled={!isAuthenticated}
							>
								Delete
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}
