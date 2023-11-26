import { INestApplication } from "@nestjs/common"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

import description from "./openApiDescription.md"
import { patchNestjsSwagger } from "@anatine/zod-nestjs"

export const setupOpenApi = (app: INestApplication) => {
	const config = new DocumentBuilder()
		.setTitle("Store API")
		.setDescription(description)
		.setVersion("1.0")
		.setExternalDoc("OpenAPI document", "./docs-json")
		.setContact(
			"Practical React with Typescript",
			"https://github.com/rudfoss/practical-react-with-typescript",
			"thomas.rudfoss@bouvet.no"
		)
		.build()

	// Enable support for zod in swagger definition
	patchNestjsSwagger()

	return {
		doc: SwaggerModule.createDocument(app, config),
		SwaggerModule
	}
}
