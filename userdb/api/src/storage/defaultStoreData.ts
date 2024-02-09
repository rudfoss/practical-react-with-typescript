import { UserDatabaseRole } from "../models"

import { StorageData } from "./StorageData"

export const ADMINISTRATOR_GROUP_ID = "5dd0a91a-d493-4fa1-b447-f90121f00bb0"
export const USERS_GROUP_ID = "716eabb3-5044-49f6-95c1-60efb5709143"
export const GUEST_GROUP_ID = "74614400-354b-4cee-889f-ec6aa8c36550"

export const defaultStoreData: StorageData = {
	users: [
		{
			id: "68a96a2b-b907-4eda-8361-51702d9c2abc",
			displayName: "The Admin",
			username: "admin",
			password: "admin",
			groupIds: [ADMINISTRATOR_GROUP_ID]
		},
		{
			id: "67dc12eb-81dc-4a4a-9fe0-12cee1d11674",
			displayName: "User",
			username: "user",
			password: "user",
			groupIds: [USERS_GROUP_ID]
		},
		{
			id: "2bc72386-7217-4cbc-80a8-1c1a81f4d9e6",
			displayName: "Guest",
			username: "guest",
			password: "guest",
			groupIds: [GUEST_GROUP_ID]
		}
	],
	groups: [
		{
			id: ADMINISTRATOR_GROUP_ID,
			displayName: "Administrator",
			description: "The administrator role has full access.",
			roles: [UserDatabaseRole.Admin],
			isSystemDefined: true
		},
		{
			id: USERS_GROUP_ID,
			displayName: "Users",
			description: "Regular users with access to read the database.",
			roles: [UserDatabaseRole.User]
		},
		{
			id: GUEST_GROUP_ID,
			displayName: "Guests",
			description:
				"Guest users have access to only their own information. New users without memberships are added to this group.",
			roles: [UserDatabaseRole.Guest],
			isSystemDefined: true
		}
	],
	userSessions: []
}
