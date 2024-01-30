import { NestFastifyApplication } from "@nestjs/platform-fastify"
import type { FastifyRequest, FastifyReply } from "fastify"

import { User, UserSession } from "./models"

interface StoreApiRequestAuthFields {
	userSession?: UserSession
	user?: User
}

export type StoreApiRequest = FastifyRequest & StoreApiRequestAuthFields
export type StoreApiRequestAuthenticated = FastifyRequest & Required<StoreApiRequestAuthFields>

export type StoreApiReply = FastifyReply

export const prepareFastifyRequest = (app: NestFastifyApplication) => {
	const fastify = app.getHttpAdapter().getInstance()
	fastify.decorateRequest("userSession", null)
	fastify.decorateRequest("user", null)
}
