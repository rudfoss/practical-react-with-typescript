import { Product, ProductCategory, ProductRating, UserSession, UserWithPassword } from "../models"

export const StorageServiceOptionsKey = Symbol("StorageServiceOptionsKey")
export const StorageServiceKey = Symbol("StorageServiceKey")

export interface StorageService {
	getProducts(): Promise<Product[]>
	setProducts(products: Product[]): Promise<void>

	getProductCategories(): Promise<ProductCategory[]>
	setProductCategories(productCategories: ProductCategory[]): Promise<void>

	getProductRatings(): Promise<ProductRating[]>
	setProductRatings(productRatings: ProductRating[]): Promise<void>

	getUsers(): Promise<UserWithPassword[]>
	setUsers(users: UserWithPassword[]): Promise<void>

	getUserSessions(): Promise<UserSession[]>
	setUserSessions(userSessions: UserSession[]): Promise<void>
}
