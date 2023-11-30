import { Product } from "./products"

export interface ProductsTableProps {
	products: Product[]
	onDelete: (product: Product) => unknown
}

export const ProductsTable = ({ products, onDelete }: ProductsTableProps) => {
	const deleteProduct = (product: Product) => () => {
		onDelete(product)
	}

	return (
		<table>
			<thead>
				<tr>
					<th>Title</th>
					<th>Price</th>
					<th>Category</th>
					<th>Rating</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{products.map((product) => (
					<tr key={product.id}>
						<td>{product.title}</td>
						<td>{product.price}</td>
						<td>{product.category}</td>
						<td>{product.rating}</td>
						<td>
							<button onClick={deleteProduct(product)}>Delete</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}
