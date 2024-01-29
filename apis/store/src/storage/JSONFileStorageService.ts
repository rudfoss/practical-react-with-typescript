import type { Low } from "lowdb/lib"

import { esmLoader } from "@react-workshop/utils"

import { Product, ProductCategory, ProductRating, UserWithPassword } from "../models"

import { StorageData } from "./StorageData"
import { StorageService } from "./StorageService"
import { defaultStoreData } from "./defaultStoreData"

const importLow = () => esmLoader<typeof import("lowdb/node")>("lowdb/node")

export interface JSONFileStorageServiceOptions {
	fileName: string
}

export class JSONFileStorageService implements StorageService {
	private db: Low<StorageData>

	protected constructor(private options: JSONFileStorageServiceOptions) {}

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

	protected async init() {
		const { JSONFilePreset } = await importLow()
		this.db = await JSONFilePreset<StorageData>(this.options.fileName, defaultStoreData)
		await this.db.read()
	}

	public static async createInstance(options: JSONFileStorageServiceOptions) {
		const instance = new JSONFileStorageService(options)
		await instance.init()
		return instance
	}
}
