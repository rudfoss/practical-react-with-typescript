import { createZodDto } from "@anatine/zod-nestjs"
import { extendApi } from "@anatine/zod-openapi"
import { z } from "zod"

const zLoginResponse = z.object({
	id: z.string(),
	userName: z.string(),
	authenticated: z.literal(true)
})

export class LoginResponse extends createZodDto(extendApi(zLoginResponse)) {}
