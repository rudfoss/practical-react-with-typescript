import { Product, ProductCategory, ProductRating, User } from "../models"

export interface StorageData {
	users: User[]
	products: Product[]
	productCategories: ProductCategory[]
	productRatings: ProductRating[]
}
