import { NestFastifyApplication } from "@nestjs/platform-fastify"
import type { FastifyRequest, FastifyReply } from "fastify"

import { UserSession } from "./auth"

export type StoreApiRequest = FastifyRequest & {
	userSession?: UserSession
}
export type StoreApiReply = FastifyReply

export const prepareFastifyRequest = (app: NestFastifyApplication) => {
	const fastify = app.getHttpAdapter().getInstance()
	fastify.decorateRequest("userSession", null)
}
