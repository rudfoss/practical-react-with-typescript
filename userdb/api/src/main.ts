import path from "node:path"
import { Logger } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify"
import fs from "fs-extra"
import { prepareFastifyRequest } from "./RequestReply"
import { AppModule } from "./app"
import { setupOpenApi } from "./openApi"

const bootstrap = async () => {
	const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())

	prepareFastifyRequest(app)
	app.enableCors()

	const { SwaggerModule, doc } = setupOpenApi(app)
	SwaggerModule.setup("/docs", app, doc)

	if (process.env.OPEN_API === "true") {
		const openApiPath = path.join(__dirname, "../../api-spec/src/json", "userdb-api-openapi.json")
		Logger.log(`App run with arg 'openApi'. Outputting openApi doc to "${openApiPath}" and exiting`)
		await fs.writeFile(openApiPath, JSON.stringify(doc))
		return
	}

	const port = process.env.PORT || 4000
	await app.listen(port)
	Logger.log(`🚀 Application is running on: http://localhost:${port}`)
}

bootstrap()
