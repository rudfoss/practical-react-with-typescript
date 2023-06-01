export const staticGroups = [
	{
		id: "25b60313-ee67-4d96-87f1-930647810d33",
		name: "User",
		role: "user",
		description: "Users can view other users and groups"
	},
	{
		id: "dfc725da-cdb6-488f-8c53-f9f3ced24c1b",
		name: "User Administrators",
		role: "userAdmin",
		description: "User administrators can manage users, but not memberships"
	},
	{
		id: "d9190c04-5b0f-45b2-933f-071fe9854959",
		name: "Group Administrators",
		role: "groupAdmin",
		description: "Group administrators can manage groups and group memberships"
	},
	{
		id: "20297b45-0808-4bd2-bc2e-0ba9fb90e606",
		name: "Guests",
		role: "guest",
		description: "Guests cannot view users or groups."
	}
]

export type Group = (typeof staticGroups)[number]
