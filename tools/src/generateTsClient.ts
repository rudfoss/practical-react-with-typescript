import { exec } from "node:child_process"
import path from "node:path"
import { promisify } from "node:util"

import chalk from "chalk"
import fs from "fs-extra"

/**
 * Exits the process if the condition is false.
 * @param condition
 * @param message
 */
export const invariant = (condition: unknown, message: string) => {
  if (!condition) {
    console.error(chalk.bold.red.bgBlack(message))
    throw new Error(message)
  }
}

const nswagParameters = (clientBaseClassName?: string) => {
  let parameters = [
    "/TypeScriptVersion:4,3",
    "/NewLineBehavior:LF",
    "/NullValue:Undefined",
    "/GenerateClientClasses:True",
    "/Template:Fetch",
    "/UseAbortSignal:True",
    "/ExportTypes:True",
    // "/GenerateClientInterfaces:True",
    "/GenerateOptionalParameters:True",
    "/UseTransformOptionsMethod:True",
    "/GenerateDtoTypes:True",
    "/TypeStyle:Interface",
    "/DateTimeType:String",
    "/EnumStyle:StringLiteral",
    "/GenerateDefaultValues:True",
    "/MarkOptionalProperties:True"
  ]
  if (clientBaseClassName) {
    parameters = [...parameters, `/ClientBaseClass:${clientBaseClassName}`]
  }
  return parameters
}

const execAsync = promisify(exec)

const addBaseClassImport = async (
  generatedClientsFilePath: string,
  nswagParameters: string[]
) => {
  const [, className] = (
    nswagParameters.find((parameter) =>
      parameter.includes("ClientBaseClass")
    ) ?? ""
  ).split(":")

  if (!className) return

  console.log(`Using ClientBaseClass parameter with class name "${className}"`)
  const clientClassFileFullPath = path.resolve(
    path.dirname(generatedClientsFilePath),
    `${className}.ts`
  )

  invariant(
    fs.existsSync(clientClassFileFullPath),
    `You must create an exported base class named "${className}" in "${clientClassFileFullPath}" in order to use the ClientBaseClass nswag-parameter`
  )

  const content = await fs.readFile(generatedClientsFilePath, {
    encoding: "utf8"
  })
  const contentWithImport =
    `import { ${className} } from "./${className}"

` + content

  await fs.writeFile(generatedClientsFilePath, contentWithImport)
}

const start = async (arguments_: string[]) => {
  const [name, openApiPath, outputPath, baseClassName] = arguments_.slice(2)
  console.log("arguments", { name, openApiPath, outputPath, baseClassName })
  invariant(name, "Missing required parameter [name]")
  invariant(openApiPath, "Missing required parameter [openApiPath]")
  invariant(outputPath, "Missing required parameter [outputPath]")
  invariant(
    baseClassName === undefined || baseClassName.match(/^[a-z]{1}[a-z0-9]+$/gi),
    `baseClassName argument "${baseClassName}" is provided, but it is not a valid class name in JavaScript (must match regex: /^[a-z]{1}[a-z0-9]+$/gi)`
  )
  const finalNswagParameters = nswagParameters(baseClassName)

  const fullOpenApiPath = path.resolve(openApiPath)

  invariant(
    fs.existsSync(fullOpenApiPath),
    `fromPath "${fullOpenApiPath}" does not exist.`
  )

  const fullOutputPath = path.resolve(outputPath, `${name}.ts`)
  console.log(`Generating "${fullOutputPath}" from "${fullOpenApiPath}"`)
  const nswagArguments = [
    "openapi2tsclient",
    `/input:${fullOpenApiPath}`,
    `/output:${fullOutputPath}`,
    ...finalNswagParameters
  ].join(" ")

  const generateCmd = `npx nswag ${nswagArguments}`
  console.log({ generateCmd })
  await execAsync(generateCmd)
  await addBaseClassImport(fullOutputPath, finalNswagParameters)
  console.log("Done")
}

start(process.argv).catch((error) => {
  console.error(error.message)
  console.error(error.stack)
  throw error
})
