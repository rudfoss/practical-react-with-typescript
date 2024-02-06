import chalk from "chalk"
import path from "node:path"
import fs from "fs-extra"
import { exec } from "child_process"
import { promisify } from "node:util"

const nswagParameters = [
	"/TypeScriptVersion:4,3",
	"/NewLineBehavior:LF",
	"/NullValue:Undefined",
	"/GenerateClientClasses:True",
	"/Template:Fetch",
	"/ExportTypes:True",
	"/ClientBaseClass:ClientBaseClass",
	"/GenerateClientInterfaces:True",
	"/GenerateOptionalParameters:True",
	"/UseTransformOptionsMethod:True",
	"/GenerateDtoTypes:True",
	"/TypeStyle:Interface",
	"/DateTimeType:String",
	"/EnumStyle:StringLiteral",
	"/GenerateDefaultValues:True",
	"/MarkOptionalProperties:True"
] as const

const invariant = (condition: unknown, message: string) => {
	if (!condition) {
		console.error(chalk.bold.red(message))
		process.exit(1)
	}
}

const execAsync = promisify(exec)

const addBaseClassImport = async (generatedClientsFilePath: string) => {
	const [param, className] = (
		nswagParameters.find((param) => param.includes("ClientBaseClass")) ?? ""
	).split(":")

	if (!className) return

	const clientClassFileFullPath = path.resolve(
		path.dirname(generatedClientsFilePath),
		`${className}.ts`
	)
	invariant(
		fs.existsSync(clientClassFileFullPath),
		`You must create an exported base class named "${className}" in "${clientClassFileFullPath}" in order to use the ClientBaseClass nswag-parameter`
	)

	const content = await fs.readFile(generatedClientsFilePath, { encoding: "utf-8" })
	const contentWithImport =
		`import { ${className} } from "./${className}"

` + content

	await fs.writeFile(generatedClientsFilePath, contentWithImport)
}

const start = async (args: string[]) => {
	const [name, openApiPath, outputPath] = args.slice(2)
	invariant(name, "Missing required parameter [name]")
	invariant(openApiPath, "Missing required parameter [openApiPath]")
	invariant(outputPath, "Missing required parameter [outputPath]")

	const fullOpenApiPath = path.resolve(openApiPath)

	invariant(fs.existsSync(fullOpenApiPath), `fromPath "${fullOpenApiPath}" does not exist.`)

	const fullOutputPath = path.resolve(outputPath, `${name}.ts`)
	console.log(`Generating "${fullOutputPath}" from "${fullOpenApiPath}"`)
	const nswagArgs = [
		"openapi2tsclient",
		`/input:${fullOpenApiPath}`,
		`/output:${fullOutputPath}`,
		...nswagParameters
	].join(" ")

	const generateCmd = `npx nswag ${nswagArgs}`
	console.log({ generateCmd })
	await execAsync(generateCmd)
	await addBaseClassImport(fullOutputPath)
	console.log("Done")
}

start(process.argv).catch((error) => {
	console.error(error.message)
	console.error(error.stack)
	process.exit(1)
})
