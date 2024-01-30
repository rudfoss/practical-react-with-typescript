import { Product, ProductCategory, ProductRating, UserSession, UserWithPassword } from "../models"

export const StorageServiceOptionsKey = Symbol("StorageServiceOptionsKey")
export const StorageServiceKey = Symbol("StorageServiceKey")

export interface StorageService {
	getProducts(): Promise<Product[]>
	getProductCategories(): Promise<ProductCategory[]>
	getProductRatings(): Promise<ProductRating[]>

	getUsers(): Promise<UserWithPassword[]>
	getUserSessions(): Promise<UserSession[]>
	dropUserSession(sessionToken: string): Promise<void>
	createUserSession(userId: string, sessionLifetimeMs: number): Promise<UserSession>
}
