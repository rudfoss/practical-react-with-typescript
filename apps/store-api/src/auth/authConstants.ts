import { SecuritySchemeObject } from "openapi3-ts/oas31"

export const bearerAuthName = "session-token"
export const bearerConfig: SecuritySchemeObject = {
	type: "http",
	description: "Add the session token here to authenticate.",
	name: "Authorization",
	bearerFormat: "Bearer",
	scheme: "Bearer",
	in: "Header"
}
