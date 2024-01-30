import type { Low } from "lowdb/lib"

import { esmLoader, merge } from "@react-workshop/utils"

import { Product, ProductCategory, ProductRating, UserSession, UserWithPassword } from "../models"

import { StorageData } from "./StorageData"
import { StorageService } from "./StorageService"
import { defaultStoreData } from "./defaultStoreData"

const importLow = () => esmLoader<typeof import("lowdb/node")>("lowdb/node")
const importNanoid = () => esmLoader<typeof import("nanoid")>("nanoid")

export interface JSONFileStorageServiceOptions {
	fileName: string
}

export class JSONFileStorageService implements StorageService {
	private db: Low<StorageData>

	protected constructor(public readonly options: Readonly<JSONFileStorageServiceOptions>) {}

	async getProducts(): Promise<Product[]> {
		return this.db.data.products
	}
	async getProductCategories(): Promise<ProductCategory[]> {
		return this.db.data.productCategories
	}
	async getProductRatings(): Promise<ProductRating[]> {
		return this.db.data.productRatings
	}

	async getUsers(): Promise<UserWithPassword[]> {
		return this.db.data.users
	}
	async getUserSessions(): Promise<UserSession[]> {
		return this.db.data.userSessions
	}
	async dropUserSession(sessionToken: string): Promise<void> {
		await this.db.update((data) => {
			data.userSessions = data.userSessions.filter(({ token }) => token !== sessionToken)
		})
	}
	async createUserSession(userId: string, sessionLifetimeMs: number): Promise<UserSession> {
		const { nanoid } = await importNanoid()
		const now = new Date().getTime()
		const session = merge(new UserSession(), {
			createdAt: now,
			expiresAt: now + sessionLifetimeMs,
			userId: userId,
			token: nanoid()
		})
		await this.db.update(({ userSessions }) => {
			userSessions.push(session)
		})

		return session
	}

	protected async init() {
		const { JSONFilePreset } = await importLow()
		this.db = await JSONFilePreset<StorageData>(this.options.fileName, defaultStoreData)
		return this
	}

	public static async createInstance(options: JSONFileStorageServiceOptions) {
		return await new JSONFileStorageService(options).init()
	}
}
