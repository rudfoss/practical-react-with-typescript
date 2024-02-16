import { ReactNode, createContext, useContext } from "react"

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
	const { authUserClient } = useApiClientsService()
	const queries = createAuthDataQueries(authUserClient)
	return (
		<AuthDataServiceContext.Provider value={{ queries }}>
			{children}
		</AuthDataServiceContext.Provider>
	)
}
