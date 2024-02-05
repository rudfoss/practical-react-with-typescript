import { SecuritySchemeObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface"

export const bearerAuthName = "session-token"
export const bearerConfig: SecuritySchemeObject = {
	type: "http",
	description:
		"Use /auth/login to create a session token then paste it here to authorize requests.",
	scheme: "bearer"
}
