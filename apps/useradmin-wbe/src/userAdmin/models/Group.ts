import { createZodDto } from "@anatine/zod-nestjs"
import { extendApi } from "@anatine/zod-openapi"
import { z } from "zod"

import { zGroup } from "../../store"

export class Group extends createZodDto(extendApi(zGroup)) {}

export class GroupWithoutID extends createZodDto(
	extendApi(zGroup.omit({ id: true }))
) {}

export class GroupIds extends createZodDto(extendApi(z.string().array())) {}
