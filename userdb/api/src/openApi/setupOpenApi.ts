import { INestApplication } from "@nestjs/common"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

import { bearerAuthName, bearerConfig } from "../auth"
import { apiDescription } from "./apiDescription"

export const setupOpenApi = (app: INestApplication) => {
	const config = new DocumentBuilder()
		.setTitle("User DB API")
		.setDescription(apiDescription)
		.setVersion("1.0")
		.setExternalDoc("OpenAPI document", "./docs-json")
		.setContact(
			"Practical React with Typescript",
			"https://github.com/rudfoss/practical-react-with-typescript",
			"thomas.rudfoss@bouvet.no"
		)
		.addBearerAuth(bearerConfig, bearerAuthName)
		.build()

	return {
		doc: SwaggerModule.createDocument(app, config),
		SwaggerModule
	}
}
