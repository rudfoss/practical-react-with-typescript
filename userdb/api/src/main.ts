import path from "node:path"

import { Logger, ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import {
  NestFastifyApplication,
  FastifyAdapter
} from "@nestjs/platform-fastify"
import fs from "fs-extra"

import { prepareFastifyRequest } from "./RequestReply"
import { AppModule } from "./app"
import { setupOpenApi } from "./openApi"

const bootstrap = async (arguments_: string[]) => {
  const [openApiArgument = "", openApiRelativePath = "./"] = arguments_.slice(2)
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  )

  prepareFastifyRequest(app)
  app.enableCors()
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: false })
  )

  const { SwaggerModule, doc } = setupOpenApi(app)
  SwaggerModule.setup("/docs", app, doc)
  if (openApiArgument.toLocaleLowerCase() === "openapi") {
    const openApiPath = path.join(
      __dirname,
      openApiRelativePath,
      "userdb-api-openapi.json"
    )
    Logger.log(
      `App run with arg 'openApi'. Outputting openApi doc to "${openApiPath}" and exiting`
    )
    await fs.writeFile(openApiPath, JSON.stringify(doc))
    return
  }

  const port = process.env.PORT || 4000
  await app.listen(port)
  Logger.log(`🚀 Application is running on: http://localhost:${port}`)
}

// This is the recommended method by the nest template
// eslint-disable-next-line unicorn/prefer-top-level-await
bootstrap(process.argv).catch((error) => {
  throw error
})
