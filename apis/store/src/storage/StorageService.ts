import { Product, ProductCategory, ProductRating, UserWithPassword } from "../models"

export const StorageServiceKey = Symbol("StorageServiceKey")

export interface StorageService {
	getProducts(): Promise<Product[]>
	getProductCategories(): Promise<ProductCategory[]>
	getProductRatings(): Promise<ProductRating[]>
	getUsers(): Promise<UserWithPassword[]>
}
