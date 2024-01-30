import { UserDbRole } from "../models"

import { StorageData } from "./StorageData"

export const ADMINISTRATOR_GROUP_ID = "5dd0a91a-d493-4fa1-b447-f90121f00bb0"

export const defaultDbData: StorageData = {
	users: [
		{
			id: "68a96a2b-b907-4eda-8361-51702d9c2abc",
			displayName: "The Admin",
			username: "admin",
			password: "admin",
			groupIds: [ADMINISTRATOR_GROUP_ID]
		}
	],
	groups: [
		{
			id: ADMINISTRATOR_GROUP_ID,
			displayName: "Administrator",
			description: "The administrator role has full access.",
			roles: [UserDbRole.Admin],
			isSystemDefined: true
		}
	],
	userSessions: []
}
