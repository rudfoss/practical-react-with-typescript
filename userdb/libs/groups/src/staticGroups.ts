export const staticGroups = [
	{
		id: "5dd0a91a-d493-4fa1-b447-f90121f00bb0",
		displayName: "Administrator",
		description: "The administrator role has full access.",
		roles: ["Admin"],
		isSystemDefined: true
	},
	{
		id: "12b2f31a-a8e6-4e08-971c-a8594f16ab76",
		displayName: "User administrators",
		description: "Users that can manage other users.",
		roles: ["UserAdmin"]
	},
	{
		id: "716eabb3-5044-49f6-95c1-60efb5709143",
		displayName: "Users",
		description: "Regular users with access to read the database.",
		roles: ["User"]
	},
	{
		id: "74614400-354b-4cee-889f-ec6aa8c36550",
		displayName: "Guests",
		description:
			"Guest users have access to only their own information. New users without memberships are added to this group.",
		roles: ["Guest"],
		isSystemDefined: true
	}
]

export type StaticGroup = (typeof staticGroups)[number]
