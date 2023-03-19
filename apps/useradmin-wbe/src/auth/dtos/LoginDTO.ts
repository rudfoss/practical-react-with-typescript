import { createZodDto } from "@anatine/zod-nestjs"
import { extendApi } from "@anatine/zod-openapi"
import { z } from "zod"

const zLoginDTO = z.object({
	userName: z.string().min(1).max(64),
	password: z.string().min(1).max(64)
})

export class LoginDTO extends createZodDto(extendApi(zLoginDTO)) {}
