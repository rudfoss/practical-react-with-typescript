export type OptionTransformer = (options: RequestInit) => Promise<RequestInit>

/**
 * A very simple base class that allows statically adding a transformer.
 */
export class UserDbApiClientBaseClass {
	public async transformOptions(options: RequestInit) {
		return UserDbApiClientBaseClass.globalOptionsTransformer?.(options)
	}

	public static globalOptionsTransformer?: OptionTransformer
}

/**
 * Set or remove the bearer token authorization header on the global parent class.
 * @param bearerToken
 * @returns
 */
export const setBearerToken = (bearerToken?: string) => {
	if (!bearerToken) {
		UserDbApiClientBaseClass.globalOptionsTransformer = undefined
		return
	}

	UserDbApiClientBaseClass.globalOptionsTransformer = async (options) => {
		options.headers = new Headers(options.headers)
		options.headers.set("Authorization", `Bearer ${bearerToken}`)
		return options
	}
}
