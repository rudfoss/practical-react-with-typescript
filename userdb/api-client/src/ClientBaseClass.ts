export type OptionTransformer = (options: RequestInit) => Promise<RequestInit>

/**
 * A very simple base class that allows statically adding option-transformers.
 */
export class ClientBaseClass {
	public async transformOptions(options: RequestInit) {
		let intermediateOptions = options
		for (const transformer of ClientBaseClass.optionTransformers) {
			intermediateOptions = await transformer(options)
		}
		return intermediateOptions
	}

	public static optionTransformers: OptionTransformer[] = []
}
