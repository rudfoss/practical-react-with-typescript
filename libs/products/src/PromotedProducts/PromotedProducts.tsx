import styled from "@emotion/styled"

import { Product } from "@prwt/generated/store-api"

import { PromotedProduct } from "./PromotedProduct"

const Container = styled.ul`
	padding: 0;
	margin: 8px;
	list-style: none;
	display: flex;
	li {
		flex: 1 1 auto;
	}
`

export interface PromotedProductsProps {
	products: Product[]
}

/**
 * Promotes up to 5 products.
 * @param param0
 * @returns
 */
export const PromotedProducts = ({ products }: PromotedProductsProps) => {
	return (
		<Container>
			{products.map((product) => (
				<PromotedProduct key={product.id} product={product} />
			))}
		</Container>
	)
}
