import { NestFastifyApplication } from "@nestjs/platform-fastify"
import type { FastifyRequest, FastifyReply } from "fastify"

import { User, UserDbRole, UserSession } from "./models"

interface UserDbApiRequestAuthFields {
	userSession?: UserSession
	user?: User
	roles?: UserDbRole[]
}

export type UserDbApiRequest = FastifyRequest & UserDbApiRequestAuthFields
export type UserDbApiRequestAuthenticated = FastifyRequest & Required<UserDbApiRequestAuthFields>

export type UserDbApiReply = FastifyReply

export const prepareFastifyRequest = (app: NestFastifyApplication) => {
	const fastify = app.getHttpAdapter().getInstance()
	fastify.decorateRequest("userSession", null)
	fastify.decorateRequest("user", null)
}
