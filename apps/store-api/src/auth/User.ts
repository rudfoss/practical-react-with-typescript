import { z } from "zod"

export const Role = z
	.enum(["admin", "productAdmin", "warehouseAdmin"])
	.describe("The role of the user")
export type Role = z.infer<typeof Role>

export const User = z.object({
	id: z.string().max(64).describe("A unique ID for this user"),
	role: Role,
	displayName: z
		.string()
		.min(1)
		.max(128)
		.optional()
		.describe(
			"Display name for the user that may differ from the username. Does not have to be unique."
		),
	username: z
		.string()
		.min(4)
		.max(64)
		.describe("The username of the user (must be unique)"),
	password: z.string().min(4).max(128).describe("The users password")
})
export type User = z.infer<typeof User>

export const UpdateUser = User.omit({ id: true })
	.partial()
	.describe("The user object to update")
export type UpdateUser = z.infer<typeof UpdateUser>
