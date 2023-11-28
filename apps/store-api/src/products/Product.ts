import { z } from "zod"

export const ProductCategory = z.enum([
	"electronics",
	"clothing",
	"home decor",
	"beauty",
	"sports"
])
export type ProductCategory = z.infer<typeof ProductCategory>

export const Product = z.object({
	id: z
		.string()
		.min(1)
		.max(64)
		.describe("The unique ID for the product (format not guaranteed)"),
	title: z.string().max(512),
	price: z
		.number()
		.min(0)
		.max(Infinity)
		.describe("The current price of the product in NOK"),
	description: z
		.string()
		.max(8196)
		.optional()
		.describe("A short description of the product"),
	category: ProductCategory,
	rating: z
		.number()
		.min(1)
		.max(5)
		.optional()
		.describe("The rating of this product from 1 (worst) to 5 (best)."),
	nrOfRatings: z
		.number()
		.min(0)
		.default(0)
		.describe("The number of people that have rated this product.")
})
export type Product = z.infer<typeof Product>

export const NewProduct = Product.omit({
	id: true,
	rating: true,
	nrOfRatings: true
}).describe("A new product that will be added and assigned an id.")
export type NewProduct = z.infer<typeof NewProduct>

export const UpdateProduct = Product.omit({ id: true })
	.partial()
	.describe("The properties of an existing product to update")
export type UpdateProduct = z.infer<typeof UpdateProduct>
