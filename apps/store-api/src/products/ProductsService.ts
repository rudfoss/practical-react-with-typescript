import { z } from "zod"
import { NewProduct, Product, ProductCategory, UpdateProduct } from "./Product"

export const ProductsService = Symbol("ProductsService")

export const GetProductsOptions = z.object({
	query: z
		.string()
		.optional()
		.describe(
			"A short text to search for in either the title, description or category."
		),
	categories: ProductCategory.array().min(1).optional(),
	count: z.coerce.number().min(1).max(100).default(10),
	offset: z.coerce.number().min(0).max(Infinity).default(0),
	sortBy: z
		.enum(["id", "title", "price", "rating", "nrOfRatings"])
		.default("id"),
	sortDirection: z.enum(["asc", "desc"]).default("asc")
})
export type GetProductsOptions = z.infer<typeof GetProductsOptions>

export interface ProductsService {
	getProducts(options?: GetProductsOptions): Promise<Product[]>
	getProduct(id: string): Promise<Product | undefined>

	newProduct(newProduct: NewProduct): Promise<Product | undefined>
	updateProduct(
		id: string,
		updateProduct: UpdateProduct
	): Promise<Product | undefined>
}
