import { createZodDto } from "@anatine/zod-nestjs"
import { extendApi } from "@anatine/zod-openapi"
import { z } from "zod"

export const zUser = z.object({
	id: z.string().min(8),
	userName: z.string().min(2),
	password: z.string().min(6).max(64).describe("A password between 6-64 characters"),

	firstName: z.string().optional(),
	lastName: z.string().optional(),
	email: z.string().email().optional(),
	age: z.number().optional(),

	comments: z.string().optional(),

	disabled: z.boolean().optional(),
	disabledSince: z.string().datetime().optional()
})
export type User = z.infer<typeof zUser>

export class UserDTO extends createZodDto(extendApi(zUser)) {}
