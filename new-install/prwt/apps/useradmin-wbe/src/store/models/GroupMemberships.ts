import { z } from "zod"

import { zGroup } from "./Group"

export const zGroupMemberships = z.object({
	group: zGroup,
	memberIds: z.string().array().describe("User ids of users that are members of this group.")
})
export type GroupMemberships = z.infer<typeof zGroupMemberships>
