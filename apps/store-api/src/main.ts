/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import {
	NestFastifyApplication,
	FastifyAdapter
} from "@nestjs/platform-fastify"

import { AppModule } from "./app"
import { setupOpenApi } from "./openApi"
import { HttpExceptionFilter } from "./exceptions"
import path from "node:path"
import fs from "fs-extra"

async function bootstrap(args: string[]) {
	const [, , openApiArg] = args
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter()
	)
	app.enableCors()
	app.useGlobalFilters(new HttpExceptionFilter())

	const { SwaggerModule, doc } = setupOpenApi(app)
	SwaggerModule.setup("/docs", app, doc)
	if (openApiArg.toLocaleLowerCase() === "openapi") {
		const openApiPath = path.join(__dirname, "store-api-openapi.json")
		Logger.log(
			`App run with arg 'openApi'. Outputting openApi doc to "${openApiPath}" and exiting`
		)
		await fs.writeFile(openApiPath, JSON.stringify(doc))
		process.exit(0)
	}

	const port = process.env.PORT || 4210
	await app.listen(port)
	Logger.log(`🚀 Application is running on: http://localhost:${port}`)
}

bootstrap(process.argv)
