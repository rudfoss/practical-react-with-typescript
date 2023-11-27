import { z } from "zod"

export const Product = z.object({
	id: z.string(),
	title: z.string().max(512),
	price: z.number().min(0).max(Infinity),
	description: z.string().max(8196),
	category: z.string().max(512),
	image: z.string(),
	rating: z
		.object({
			rate: z.number().min(0).max(6),
			count: z.number().min(0).max(Infinity)
		})
		.partial()
		.optional()
})
export type Product = z.infer<typeof Product>

export const UpsertProduct = z
	.union([
		Product.omit({ id: true, image: true }),
		Product.omit({ id: true, image: true })
			.partial()
			.merge(Product.pick({ id: true }))
	])
	.describe("Either a partial existing product or a complete new one.")
export type UpsertProduct = z.infer<typeof Product>
