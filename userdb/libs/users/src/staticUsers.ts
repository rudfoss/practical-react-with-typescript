export const staticUsers = [
	{
		id: "68a96a2b-b907-4eda-8361-51702d9c2abc",
		displayName: "The Admin",
		username: "admin",
		groupIds: ["5dd0a91a-d493-4fa1-b447-f90121f00bb0"]
	},
	{
		id: "67dc12eb-81dc-4a4a-9fe0-12cee1d11674",
		displayName: "User",
		username: "user",
		groupIds: ["716eabb3-5044-49f6-95c1-60efb5709143"]
	},
	{
		id: "2bc72386-7217-4cbc-80a8-1c1a81f4d9e6",
		displayName: "Guest",
		username: "guest",
		groupIds: ["74614400-354b-4cee-889f-ec6aa8c36550"]
	}
]

export type StaticUser = (typeof staticUsers)[number]
