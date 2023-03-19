import { createZodDto } from "@anatine/zod-nestjs"
import { extendApi } from "@anatine/zod-openapi"
import { z } from "zod"

const zLoginResponseDTO = z.object({
	userName: z.string(),
	authenticated: z.literal(true)
})

export class LoginResponseDTO extends createZodDto(extendApi(zLoginResponseDTO)) {}
