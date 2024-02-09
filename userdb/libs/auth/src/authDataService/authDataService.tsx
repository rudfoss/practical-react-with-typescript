import { createContext, useContext, useMemo } from "react"

import {
	AuthControllerClient,
	AuthUserControllerClient,
	IAuthControllerClient,
	IAuthUserControllerClient
} from "@react-workshop/userdb-api-client"

import { AuthDataQueries, createAuthDataQueries } from "./authDataQueries"
import { useSessionTokenService } from "./sessionTokenService"

export interface AuthDataServiceContextProps {
	authClient: IAuthControllerClient
	authUserClient: IAuthUserControllerClient
	queries: AuthDataQueries
}

const AuthDataServiceContext = createContext<AuthDataServiceContextProps | undefined>(undefined)
AuthDataServiceContext.displayName = "AuthDataServiceContext"

export const useAuthDataService = () => {
	const context = useContext(AuthDataServiceContext)
	if (!context) throw new Error("AuthDataService must be provided before use")
	return context
}

export interface ProvideAuthDataServiceProps {
	baseUrl?: string
	children: React.ReactNode
}

export const ProvideAuthDataService = ({
	baseUrl = "/",
	children
}: ProvideAuthDataServiceProps) => {
	const { sessionToken } = useSessionTokenService()
	const authClient = useMemo(() => new AuthControllerClient(baseUrl), [baseUrl])
	const authUserClient = useMemo(() => new AuthUserControllerClient(baseUrl), [baseUrl])
	const queries = useMemo(
		() => createAuthDataQueries(authClient, authUserClient, !!sessionToken),
		[authClient, authUserClient, sessionToken]
	)

	const value = useMemo((): AuthDataServiceContextProps => {
		return {
			authClient,
			authUserClient,
			queries
		}
	}, [authClient, authUserClient, queries])
	return <AuthDataServiceContext.Provider value={value}>{children}</AuthDataServiceContext.Provider>
}
