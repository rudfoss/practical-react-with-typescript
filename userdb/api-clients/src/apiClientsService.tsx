import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from "react"

import {
	AuthControllerClient,
	AuthUserControllerClient,
	GroupsControllerClient,
	UsersControllerClient
} from "./UserDbApiClient"
import { UserDbApiClientBaseClass as UserDatabaseApiClientBaseClass } from "./UserDbApiClientBaseClass"

export interface ApiClientsServiceContextProps {
	sessionToken?: string
	setSessionToken: (newSessionToken?: string) => unknown

	authClient: AuthControllerClient
	authUserClient: AuthUserControllerClient
	groupsClient: GroupsControllerClient
	usersClient: UsersControllerClient
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
	const authClient = useMemo(() => new AuthControllerClient(baseUrl), [baseUrl])
	const authUserClient = useMemo(() => new AuthUserControllerClient(baseUrl), [baseUrl])
	const groupsClient = useMemo(() => new GroupsControllerClient(baseUrl), [baseUrl])
	const usersClient = useMemo(() => new UsersControllerClient(baseUrl), [baseUrl])

	const setSessionToken = useCallback((newSessionToken?: string) => {
		UserDatabaseApiClientBaseClass.bearerToken = newSessionToken
		setSessionTokenInternal(newSessionToken)
	}, [])

	const value = useMemo((): ApiClientsServiceContextProps => {
		return {
			sessionToken,
			setSessionToken,
			authClient,
			authUserClient,
			groupsClient,
			usersClient
		}
	}, [authClient, authUserClient, groupsClient, sessionToken, setSessionToken, usersClient])
	return (
		<ApiClientsServiceContext.Provider value={value}>{children}</ApiClientsServiceContext.Provider>
	)
}
