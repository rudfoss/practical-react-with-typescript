import { UserRole } from "../models"

import { StorageData } from "./StorageData"

export const defaultStoreData: StorageData = {
	users: [
		{
			id: "68a96a2b-b907-4eda-8361-51702d9c2abc",
			displayName: "The Admin",
			username: "admin",
			password: "admin",
			role: UserRole.Admin
		}
	],
	products: [],
	productCategories: [],
	productRatings: []
}
