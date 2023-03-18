import { createZodDto } from "@anatine/zod-nestjs"
import { extendApi } from "@anatine/zod-openapi"

import { zGroupMemberships } from "../../store"

export class GroupMembershipsDTO extends createZodDto(extendApi(zGroupMemberships)) {}
