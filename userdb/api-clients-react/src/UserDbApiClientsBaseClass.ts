export type OptionTransformer = (options: RequestInit) => Promise<RequestInit>

/**
 * A very simple base class that allows statically adding a transformer.
 */
export class UserDbApiClientsBaseClass {
  public async transformOptions(options: RequestInit) {
    const bearerToken = UserDbApiClientsBaseClass.bearerToken

    if (!bearerToken) return options

    options.headers = new Headers(options.headers)
    options.headers.set("Authorization", `Bearer ${bearerToken}`)
    return options
  }

  /**
   * Set this to a valid bearer token to enable authenticated requests for all clients extending the base class.
   */
  public static bearerToken?: string
}
