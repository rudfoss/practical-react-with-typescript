import {
	MutableRefObject,
	ReactNode,
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState
} from "react"

import { useLazyRef } from "@react-workshop/utils"

import {
	AuthControllerClient,
	AuthUserControllerClient,
	GroupsControllerClient,
	UsersControllerClient
} from "./UserDbApiClient"
import { UserDbApiClientBaseClass as UserDatabaseApiClientBaseClass } from "./UserDbApiClientsBaseClass"

export interface ApiClientsServiceContextProps {
	baseUrl: string
	sessionToken?: string
	setSessionToken: (newSessionToken?: string) => unknown

	authClient: MutableRefObject<AuthControllerClient>
	authUserClient: MutableRefObject<AuthUserControllerClient>
	groupsClient: MutableRefObject<GroupsControllerClient>
	usersClient: MutableRefObject<UsersControllerClient>
}

const ApiClientsServiceContext = createContext<ApiClientsServiceContextProps | undefined>(undefined)
ApiClientsServiceContext.displayName = "ApiClientsServiceContext"

export const useApiClientsService = () => {
	const context = useContext(ApiClientsServiceContext)
	if (!context) throw new Error("ApiClientsService must be provided before use")
	return context
}

export interface ProvideApiClientsServiceProps {
	baseUrl: string
	children: ReactNode
}

export const ProvideApiClientsService = ({ baseUrl, children }: ProvideApiClientsServiceProps) => {
	const [sessionToken, setSessionTokenInternal] = useState<string>()
	const setSessionToken = useCallback((newSessionToken?: string) => {
		UserDatabaseApiClientBaseClass.bearerToken = newSessionToken
		setSessionTokenInternal(newSessionToken)
	}, [])

	/**
	 * This seems messy, why use refs for value that change?
	 * The answer is a bit complex. Read the full discussion here: https://github.com/TkDodo/blog-comments/discussions/102#discussioncomment-8379555
	 * The issue is that Tanstack Query caches queryFn-functions based on the queryKey to optimize rendering. If a client were to be passed directly to the queryFn it would become stale when `baseUrl` is changed.
	 *
	 * To avoid this issue the reference (object with a current property) is passed to the queries instead so that the clients can be updated behind the scenes and the new instances passed to the queries while keeping a stable reference to the reference object. For this to work we need to hook up a custom effect that updates the controllers when any dependencies change (see below)
	 */
	const authClient = useLazyRef(() => new AuthControllerClient(baseUrl))
	const authUserClient = useLazyRef(() => new AuthUserControllerClient(baseUrl))
	const groupsClient = useLazyRef(() => new GroupsControllerClient(baseUrl))
	const usersClient = useLazyRef(() => new UsersControllerClient(baseUrl))

	// This is where we update the ref-objects if the baseUrl changes
	useEffect(() => {
		authClient.current = new AuthControllerClient(baseUrl)
		authUserClient.current = new AuthUserControllerClient(baseUrl)
		groupsClient.current = new GroupsControllerClient(baseUrl)
		usersClient.current = new UsersControllerClient(baseUrl)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [baseUrl]) // We must not depend on the stable objects returned by lazy ref as they are not directly manipulated. Otherwise this would look like (though in theroy not behave like) an infinite loop. Ref: https://github.com/facebook/react/issues/20752

	const value = useMemo((): ApiClientsServiceContextProps => {
		return {
			baseUrl,
			sessionToken,
			setSessionToken,

			authClient,
			authUserClient,
			groupsClient,
			usersClient
		}
	}, [
		authClient,
		authUserClient,
		baseUrl,
		groupsClient,
		sessionToken,
		setSessionToken,
		usersClient
	])
	return (
		<ApiClientsServiceContext.Provider value={value}>{children}</ApiClientsServiceContext.Provider>
	)
}
