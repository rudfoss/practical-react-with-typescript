import { NestFastifyApplication } from "@nestjs/platform-fastify"
import type { FastifyRequest, FastifyReply } from "fastify"

import { UserInformation, UserSession } from "./models"

interface UserDatabaseApiRequestAuthFields {
	userSession?: UserSession
	userInformation?: UserInformation
}

export type UserDatabaseApiRequest = FastifyRequest & UserDatabaseApiRequestAuthFields
export type UserDatabaseApiRequestAuthenticated = FastifyRequest &
	Required<UserDatabaseApiRequestAuthFields>

export type UserDatabaseApiReply = FastifyReply

export const prepareFastifyRequest = (app: NestFastifyApplication) => {
	const fastify = app.getHttpAdapter().getInstance()

	/*
	Ref: https://fastify.dev/docs/latest/Reference/Decorators/#decorators
	Note that it is important to keep the initial shape of a decorated field as close as possible to the value intended to be set dynamically in the future. Initialize a decorator as a '' if the intended value is a string, and as null if it will be an object or a function.
	*/
	// eslint-disable-next-line unicorn/no-null
	fastify.decorateRequest("userSession", null)
	// eslint-disable-next-line unicorn/no-null
	fastify.decorateRequest("user", null)
}
