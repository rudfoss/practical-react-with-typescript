import { ReactNode, RefObject, createContext, useCallback, useContext, useEffect, useRef } from "react"
import {
	AppControllerClient,
	AuthControllerClient,
	AuthUserControllerClient,
	GroupsControllerClient,
	UsersControllerClient
} from "../ts"

/**
 * Get a configured client.
 */
export type ClientGetter<TClient> = () => TClient

/**
 * A function that can transform options as part of a pipeline before requests are transmitted.
 */
export type OptionsTransformer = (options: RequestInit) => RequestInit | Promise<RequestInit>

export interface UserDbApiServiceContextProps {
	baseUrl: string

	/**
	 * Register a transformer that will execute just before a client performs a request.
	 * @param optionsTransformer
	 */
	onPrefetch: (optionsTransformer: OptionsTransformer) => void
	/**
	 * Unregister a previously registered transformer.
	 * @param optionsTransformer
	 */
	offPrefetch: (optionsTransformer: OptionsTransformer) => void

	appClient: ClientGetter<AppControllerClient>
	authClient: ClientGetter<AuthControllerClient>
	authUserClient: ClientGetter<AuthUserControllerClient>
	usersClient: ClientGetter<UsersControllerClient>
	groupsClient: ClientGetter<GroupsControllerClient>
}

const UserDbApiServiceContext = createContext<UserDbApiServiceContextProps | undefined>(undefined)
UserDbApiServiceContext.displayName = "UserDbApiServiceContext"

const createFetchProxy =
	(prefetchFunctionsRef: RefObject<Set<OptionsTransformer>>): typeof fetch =>
	async (init, baseOptions) => {
		let options = { ...baseOptions }
		for (const prefetchFunction of prefetchFunctionsRef.current) {
			options = {
				...options,
				...(await prefetchFunction(options))
			}
		}
		return fetch(init, options)
	}

export const useUserDbApiService = () => {
	const context = useContext(UserDbApiServiceContext)
	if (!context) throw new Error("UserDbApiService must be provided before use")
	return context
}

export interface ProvideUserDbApiServiceProps {
	baseUrl?: string
	children: ReactNode
}

/**
 * Provides a context with `ClientGetter` instances for each API client for the UserDbApi
 */
export const ProvideUserDbApiService = ({
	baseUrl = "http://localhost:4000",
	children
}: ProvideUserDbApiServiceProps) => {
	const baseUrlRef = useRef(baseUrl)
	useEffect(() => {
		baseUrlRef.current = baseUrl
	}, [baseUrl])

	const prefetchFunctions = useRef(new Set<OptionsTransformer>())
	const fetchProxy = useCallback(createFetchProxy(prefetchFunctions), [])

	const onPrefetch = useCallback((optionsTransformer: OptionsTransformer) => {
		prefetchFunctions.current.add(optionsTransformer)
	}, [])
	const offPrefetch = useCallback((optionsTransformer: OptionsTransformer) => {
		prefetchFunctions.current.delete(optionsTransformer)
	}, [])

	const appClient = useRef<ClientGetter<AppControllerClient>>(
		() => new AppControllerClient(baseUrlRef.current, { fetch: fetchProxy })
	)
	const authClient = useRef<ClientGetter<AuthControllerClient>>(
		() => new AuthControllerClient(baseUrlRef.current, { fetch: fetchProxy })
	)
	const authUserClient = useRef<ClientGetter<AuthUserControllerClient>>(
		() => new AuthUserControllerClient(baseUrlRef.current, { fetch: fetchProxy })
	)
	const usersClient = useRef<ClientGetter<UsersControllerClient>>(
		() => new UsersControllerClient(baseUrlRef.current, { fetch: fetchProxy })
	)
	const groupsClient = useRef<ClientGetter<GroupsControllerClient>>(
		() => new GroupsControllerClient(baseUrlRef.current, { fetch: fetchProxy })
	)

	const value: UserDbApiServiceContextProps = {
		baseUrl,

		onPrefetch,
		offPrefetch,

		appClient: appClient.current,
		authClient: authClient.current,
		authUserClient: authUserClient.current,
		usersClient: usersClient.current,
		groupsClient: groupsClient.current
	}
	return <UserDbApiServiceContext.Provider value={value}>{children}</UserDbApiServiceContext.Provider>
}
