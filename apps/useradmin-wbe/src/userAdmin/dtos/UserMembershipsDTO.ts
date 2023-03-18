import { createZodDto } from "@anatine/zod-nestjs"
import { extendApi } from "@anatine/zod-openapi"

import { zUserMemberships } from "../../store"

export class UserMembershipsDTO extends createZodDto(extendApi(zUserMemberships)) {}
