import { Product, ProductCategory, ProductRating, UserWithPassword } from "../models"

export interface StorageData {
	users: UserWithPassword[]
	products: Product[]
	productCategories: ProductCategory[]
	productRatings: ProductRating[]
}
