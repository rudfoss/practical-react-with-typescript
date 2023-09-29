import { createZodDto } from "@anatine/zod-nestjs"
import { extendApi } from "@anatine/zod-openapi"

import { zGroupMemberships } from "../../store"

export class GroupMemberships extends createZodDto(
	extendApi(zGroupMemberships)
) {}
