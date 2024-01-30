import { Product, ProductCategory, ProductRating, UserSession, UserWithPassword } from "../models"

export interface StorageData {
	users: UserWithPassword[]
	userSessions: UserSession[]
	products: Product[]
	productCategories: ProductCategory[]
	productRatings: ProductRating[]
}
