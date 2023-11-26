import { z } from "zod"

export const Product = z.object({
	id: z.number().int().min(0).max(Infinity),
	title: z.string().max(512),
	price: z.number().min(0).max(Infinity),
	description: z.string().max(8196),
	category: z.string().max(512),
	image: z.string().url(),
	rating: z.object({
		rate: z.number().min(0).max(6),
		count: z.number().min(0).max(Infinity)
	})
})
export type Product = z.infer<typeof Product>

export const NewProduct = Product.omit({ id: true })
export type NewProduct = z.infer<typeof Product>
