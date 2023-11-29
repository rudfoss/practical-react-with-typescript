import { NestFastifyApplication } from "@nestjs/platform-fastify"
import type { FastifyRequest, FastifyReply } from "fastify"

import { User, UserSession } from "./auth"

export type StoreApiRequest = FastifyRequest & {
	user?: Omit<User, "password">
	session?: UserSession
}
export type StoreApiReply = FastifyReply

export const prepareFastifyRequest = (app: NestFastifyApplication) => {
	const fastify = app.getHttpAdapter().getInstance()
	fastify.decorateRequest("user", null)
	fastify.decorateRequest("session", null)
}
