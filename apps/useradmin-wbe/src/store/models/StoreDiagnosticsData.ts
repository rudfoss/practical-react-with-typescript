import { createZodDto } from "@anatine/zod-nestjs"
import { extendApi } from "@anatine/zod-openapi"
import { z } from "zod"

export const zStoreDiagnosticsData = z.object({
	nrOfUsers: z.number(),
	nrOfGroups: z.number(),
	nrOfDistinctMemberships: z
		.number()
		.describe("The total number of user <-> group connections in the store"),
	nrOfMembersPerGroup: z
		.object({
			groupId: z.string(),
			nrOfMembers: z.number()
		})
		.array()
})
export type StoreDiagnosticsData = z.infer<typeof zStoreDiagnosticsData>

export class StoreDiagnosticsDataDTO extends createZodDto(extendApi(zStoreDiagnosticsData)) {}
