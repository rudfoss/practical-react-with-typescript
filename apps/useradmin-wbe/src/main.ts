/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify"

import { MainModule } from "./mainModule"
import { setupOpenApi } from "./openApi"

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(MainModule, new FastifyAdapter())

	const { SwaggerModule, doc } = setupOpenApi(app)
	SwaggerModule.setup("/docs", app, doc)

	const port = process.env.PORT || 4210
	await app.listen(port, "0.0.0.0")
	Logger.log(`🚀 Application is running on: http://localhost:${port}`)
}

bootstrap()
