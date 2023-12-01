import chalk from "chalk"
import path from "node:path"
import fs from "fs-extra"
import { exec } from "child_process"
import { promisify } from "node:util"

const nswagParameters = [
	"/NullValue:Undefined",
	"/Template:Fetch",
	"/TypeStyle:Class",
	"/EnumStyle:StringLiteral",
	"/GenerateClientClasses:True",
	"/GenerateClientInterfaces:True",
	"/GenerateOptionalParameters:True",
	"/DateTimeType:String",
	"/TypeScriptVersion:4,3",
	"/NewLineBehavior:LF"
] as const

const invariant = (condition: unknown, message: string) => {
	if (!condition) {
		console.error(chalk.bold.red(message))
		process.exit(1)
	}
}

const execAsync = promisify(exec)

const start = async (args: string[]) => {
	const [, , name, openApiPath, outputPath] = args
	invariant(name, "Missing required parameter [name]")
	invariant(openApiPath, "Missing required parameter [openApiPath]")
	invariant(outputPath, "Missing required parameter [outputPath]")

	const fullOpenApiPath = path.resolve(openApiPath)

	invariant(
		fs.existsSync(fullOpenApiPath),
		`fromPath "${fullOpenApiPath}" does not exist.`
	)

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
	console.log("Done")
}

start(process.argv).catch((error) => {
	console.error(error.message)
	console.error(error.stack)
	process.exit(1)
})
