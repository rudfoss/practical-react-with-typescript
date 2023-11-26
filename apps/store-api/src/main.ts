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

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter()
	)
	app.enableCors()

	const { SwaggerModule, doc } = setupOpenApi(app)
	SwaggerModule.setup("/docs", app, doc)

	const port = process.env.PORT || 4210
	await app.listen(port)
	Logger.log(`🚀 Application is running on: http://localhost:${port}`)
}

bootstrap()
