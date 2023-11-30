import { Product } from "./products"

export interface ProductImageDimensions {
	width: number
	height: number
}
export const getProductImageUrl = (
	product: Product,
	{ width, height }: ProductImageDimensions
) => `https://picsum.photos/seed/${product.id}/${width}/${height}`
