import { createZodDto } from "@anatine/zod-nestjs"
import { extendApi } from "@anatine/zod-openapi"
import { z } from "zod"

import { zUser } from "../../store"

export class User extends createZodDto(extendApi(zUser)) {}

export class UserWithoutID extends createZodDto(
	extendApi(zUser.omit({ id: true }))
) {}

export class UserIds extends createZodDto(extendApi(z.string().array())) {}
