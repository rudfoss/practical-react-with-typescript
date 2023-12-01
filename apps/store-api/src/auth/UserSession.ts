import { z } from "zod"

import { ClientUser } from "./User"

export const Session = z.object({
	userId: z.string().max(64).describe("The id of the user"),
	token: z.string().max(128).describe("The users token"),
	createdAt: z
		.number()
		.min(0)
		.describe("Timestamp for when the session was started."),
	expiresAt: z.number().min(0).describe("Timestamp when the token expires.")
})
export type Session = z.infer<typeof Session>

export const UserSession = z.object({
	session: Session,
	user: ClientUser
})
export type UserSession = z.infer<typeof UserSession>
