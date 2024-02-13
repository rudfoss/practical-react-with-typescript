import chalk from "chalk"

/**
 * Exits the process if the condition is false.
 * @param condition
 * @param message
 */
export const invariant = (condition: unknown, message: string) => {
	if (!condition) {
		console.error(chalk.bold.red.bgBlack(message))
		process.exit(1)
	}
}

/**
 * Helps logging a step by name
 * @param name
 * @param action
 */
export const step = async (name: string, action: () => Promise<void>) => {
	console.log(`${chalk.bold.white.bgBlack`Step: ${name}`} ${chalk.bold.white.bgBlack`START`}`)
	console.log(chalk.bold.white.bgBlack`-----------------------------------------------`)
	try {
		await action()
		console.log(`${chalk.bold.white.bgBlack`Step: ${name}`} ${chalk.bold.white.bgGreen`SUCCESS`}`)
		console.log("")
	} catch (error) {
		console.log(`${chalk.bold.red`Step: ${name}`} ${chalk.bold.white.bgRed`FAILED`}`)
		process.exit(1)
	}
}
