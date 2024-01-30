import { StorageData } from "./StorageData"

export const defaultDbData: StorageData = {
	users: [
		{
			id: "68a96a2b-b907-4eda-8361-51702d9c2abc",
			displayName: "The Admin",
			username: "admin",
			password: "admin",
			roleIds: ["0a894cf4-07b6-4f1e-b7e7-03312b70013a"]
		}
	],
	roles: [
		{
			id: "0a894cf4-07b6-4f1e-b7e7-03312b70013a",
			displayName: "Administrator",
			description: "The administrator role has full access.",
			isSystemRole: true
		}
	],
	userSessions: []
}
