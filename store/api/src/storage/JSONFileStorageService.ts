import type { Low } from "lowdb/lib"

import { esmLoader } from "@react-workshop/utils"

import { Product, ProductCategory, ProductRating, UserSession, UserWithPassword } from "../models"

import { StorageData } from "./StorageData"
import { StorageService } from "./StorageService"
import { defaultStoreData } from "./defaultStoreData"

const importLowdb = () => esmLoader<typeof import("lowdb/node")>("lowdb/node")

export interface JSONFileStorageServiceOptions {
	fileName: string
}

export class JSONFileStorageService implements StorageService {
	private db: Low<StorageData>

	protected constructor(public readonly options: Readonly<JSONFileStorageServiceOptions>) {}

	protected get<TDBItem extends keyof StorageData>(key: TDBItem): StorageData[TDBItem] {
		return this.db.data[key]
	}
	protected async set<TDBItem extends keyof StorageData>(
		key: TDBItem,
		value: StorageData[TDBItem]
	) {
		await this.db.update((data) => {
			data[key] = value
		})
	}

	public async getProducts() {
		return this.get("products")
	}
	public async setProducts(products: Product[]) {
		await this.set("products", products)
	}

	public async getProductCategories() {
		return this.get("productCategories")
	}
	public async setProductCategories(productCategories: ProductCategory[]) {
		await this.set("productCategories", productCategories)
	}

	public async getProductRatings() {
		return this.get("productRatings")
	}
	public async setProductRatings(productRatings: ProductRating[]) {
		await this.set("productRatings", productRatings)
	}

	public async getUsers() {
		return this.get("users")
	}
	public async setUsers(usersWithPassword: UserWithPassword[]) {
		await this.set("users", usersWithPassword)
	}

	public async getUserSessions(): Promise<UserSession[]> {
		return this.get("userSessions")
	}
	public async setUserSessions(userSessions: UserSession[]) {
		return this.set("userSessions", userSessions)
	}

	protected async flushInactiveSessions() {
		const now = new Date().getTime()
		await this.db.update((data) => {
			data.userSessions = data.userSessions.filter((session) => session.expiresAt > now)
		})
	}

	protected async init() {
		const { JSONFilePreset } = await importLowdb()
		this.db = await JSONFilePreset<StorageData>(this.options.fileName, defaultStoreData)
		this.flushInactiveSessions()
		return this
	}

	public static async createInstance(options: JSONFileStorageServiceOptions) {
		return await new JSONFileStorageService(options).init()
	}
}
