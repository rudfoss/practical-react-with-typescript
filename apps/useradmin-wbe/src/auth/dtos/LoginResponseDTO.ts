import { createZodDto } from "@anatine/zod-nestjs"
import { extendApi } from "@anatine/zod-openapi"
import { z } from "zod"

const zAuthResponseDTO = z.object({
	id: z.string(),
	userName: z.string(),
	authenticated: z.literal(true)
})

export class AuthResponseDTO extends createZodDto(extendApi(zAuthResponseDTO)) {}
