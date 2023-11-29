import { z } from "zod"

export const HealthData = z
	.object({
		ok: z.boolean().default(true),
		bootTime: z.string().describe("Date and time of boot in ISO format."),
		upTime: z.string().describe("Runtime duration in ISO format.")
	})
	.describe("Health data information about the API")
export type HealthData = z.infer<typeof HealthData>
