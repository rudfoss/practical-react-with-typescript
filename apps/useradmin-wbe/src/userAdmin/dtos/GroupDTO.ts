import { createZodDto } from "@anatine/zod-nestjs"
import { extendApi } from "@anatine/zod-openapi"
import { z } from "zod"

import { zGroup } from "../../store"

export class GroupDTO extends createZodDto(extendApi(zGroup)) {}

export class GroupWithoutIDDTO extends createZodDto(extendApi(zGroup.omit({ id: true }))) {}

export class GroupIdsDTO extends createZodDto(extendApi(z.string().array())) {}
