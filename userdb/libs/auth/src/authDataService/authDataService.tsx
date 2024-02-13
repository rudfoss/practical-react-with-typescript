import { ReactNode, createContext, useContext, useMemo } from "react"

import { useApiClientsService } from "@react-workshop/userdb-api-clients"

import { AuthDataQueries, createAuthDataQueries } from "./authDataQueries"

export interface AuthDataServiceContextProps {
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
	children: ReactNode
}

export const ProvideAuthDataService = ({ children }: ProvideAuthDataServiceProps) => {
	const { sessionToken, authClient, authUserClient } = useApiClientsService()

	const value = useMemo((): AuthDataServiceContextProps => {
		const queries = createAuthDataQueries(authClient, authUserClient, !!sessionToken)

		return {
			queries
		}
	}, [authClient, authUserClient, sessionToken])
	return <AuthDataServiceContext.Provider value={value}>{children}</AuthDataServiceContext.Provider>
}
