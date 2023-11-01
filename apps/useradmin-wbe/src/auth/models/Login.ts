import { createZodDto } from "@anatine/zod-nestjs"
import { extendApi } from "@anatine/zod-openapi"
import { z } from "zod"

const zLogin = z.object({
	userName: z.string().min(1).max(64),
	password: z.string().min(1).max(64)
})

export class Login extends createZodDto(extendApi(zLogin)) {}
