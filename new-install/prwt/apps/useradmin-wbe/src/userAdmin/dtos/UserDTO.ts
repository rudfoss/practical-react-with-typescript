import { createZodDto } from "@anatine/zod-nestjs"
import { extendApi } from "@anatine/zod-openapi"
import { z } from "zod"

import { zUser } from "../../store"

export class UserDTO extends createZodDto(extendApi(zUser)) {}

export class UserWithoutIDDTO extends createZodDto(extendApi(zUser.omit({ id: true }))) {}

export class UserIdsDTO extends createZodDto(extendApi(z.string().array())) {}
