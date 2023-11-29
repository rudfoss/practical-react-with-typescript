import { z } from "zod"

export const UserSession = z.object({
	userId: z.string().max(64).describe("The id of the user"),
	token: z.string().max(128).describe("The users token"),
	createdAt: z
		.number()
		.min(0)
		.describe("Timestamp for when the session was started."),
	expiresAt: z.number().min(0).describe("Timestamp when the token expires.")
})
export type UserSession = z.infer<typeof UserSession>
