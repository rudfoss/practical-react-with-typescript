export type OptionTransformer = (options: RequestInit) => Promise<RequestInit>

/**
 * A very simple base class that allows statically adding a transformer.
 */
export class ClientBaseClass {
	public async transformOptions(options: RequestInit) {
		return ClientBaseClass.globalOptionsTransformer?.(options)
	}

	public static globalOptionsTransformer?: OptionTransformer
}
