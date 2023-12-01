import styled from "@emotion/styled"

import { Product } from "@prwt/generated/store-api"

import { getDummyPictureUrl } from "../getDummyPictureUrl"

const ListItem = styled.li`
	flex: 0 0 0;
	width: 0;
	padding: 0px 12px 12px;
	border-radius: 4px;
	margin: 8px;
	box-shadow: 0 0 4px #909090;
	overflow: hidden;

	&:hover {
		background: #f0f0f0;
	}

	display: flex;
	align-items: center;
	flex-direction: column;
	color: inherit;
	text-decoration: none;
	height: 100%;

	img {
		display: block;
	}

	div {
		text-align: center;
		padding-top: 8px;
		&:last-child {
			margin-top: auto;
		}
	}
`

export interface PromotedProductProps {
	product: Product
}

export const PromotedProduct = ({ product }: PromotedProductProps) => {
	const { id, title, price } = product
	return (
		<ListItem>
			<img
				src={getDummyPictureUrl(id.substring(0, 4), {
					width: 600,
					height: 200
				})}
				alt={title}
			/>
			<div>{title}</div>
			<div>{price}</div>
		</ListItem>
	)
}
