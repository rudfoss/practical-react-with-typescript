import styled from "@emotion/styled"

import { getDummyPictureUrl } from "./getDummyPictureUrl"
import { Product } from "./products"

const IdContainer = styled.div`
	color: #ccc;
	font-style: italic;
`

export interface ProductDetailsProps {
	product: Product
}

export const ProductDetails = ({ product }: ProductDetailsProps) => {
	const { title, id, price, description, category, rating, nrOfRatings } =
		product
	return (
		<div>
			<h1>{title}</h1>
			<IdContainer>{id}</IdContainer>
			<img
				src={getDummyPictureUrl(product.id.substring(0, 4), {
					width: 600,
					height: 200
				})}
				alt="Product"
			/>
			<p>{description}</p>
			<dl>
				<dt>Price</dt>
				<dd>{price} NOK</dd>
				<dt>Category</dt>
				<dd>{category}</dd>
				<dt>Rating</dt>
				<dd>
					{rating} ({nrOfRatings})
				</dd>
			</dl>
		</div>
	)
}
