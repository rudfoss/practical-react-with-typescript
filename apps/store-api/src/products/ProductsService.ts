import { z } from "zod"
import { Product } from "./data"

export const ProductsService = Symbol("ProductsService")

export const GetProductsOptions = z.object({
	count: z.coerce.number().min(1).max(100).default(10),
	offset: z.coerce.number().min(0).max(Infinity).default(0),
	sortBy: z.enum(["id", "title", "price", "category", "rating"]).default("id"),
	sortDirection: z.enum(["asc", "desc"]).default("asc")
})
export type GetProductsOptions = z.infer<typeof GetProductsOptions>

export interface ProductsService {
	getProducts(options?: GetProductsOptions): Promise<Product[]>
	getProduct(id: number): Promise<Product | undefined>
}
