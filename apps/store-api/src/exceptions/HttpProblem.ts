import { createZodDto } from "@anatine/zod-nestjs"
import { extendApi } from "@anatine/zod-openapi"
import { z } from "zod"

export const HttpProblem = z.object({
	type: z.string(),
	status: z.number().min(100).max(999),
	title: z.string().optional(),
	detail: z.string().optional(),
	instance: z.string().optional()
})
export type HttpProblem = z.infer<typeof HttpProblem>
export class HttpProblemResponse extends createZodDto(extendApi(HttpProblem)) {}
