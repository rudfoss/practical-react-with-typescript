import { useQuery } from "@tanstack/react-query"
import { createContext, useContext, useMemo, useState } from "react"

import { Group, User, UserDatabaseRole, UserSession } from "@react-workshop/userdb-api-client"

import { useAuthDataService } from "../authDataService"
import { useSessionTokenService } from "../sessionTokenService"

interface AuthServiceCommonContextProps {
	login: (username: string, password: string) => unknown
	logout: () => unknown
}
interface AuthServiceAnonymousContextProps {
	isAuthenticated: false
}
interface AuthServiceAuthenticatedContextProps {
	isAuthenticated: true
	session: UserSession
	roles: UserDatabaseRole
	user: User
	groups: Group[]
}

export type AuthServiceContextProps = AuthServiceCommonContextProps &
	(AuthServiceAnonymousContextProps | AuthServiceAuthenticatedContextProps)

const AuthServiceContext = createContext<AuthServiceContextProps | undefined>(undefined)
AuthServiceContext.displayName = "AuthServiceContext"

export const useAuthService = () => {
	const context = useContext(AuthServiceContext)
	if (!context) throw new Error("AuthService must be provided before use")
	return context
}

export interface ProvideAuthServiceProps {
	children: React.ReactNode
}

export const ProvideAuthService = ({ children }: ProvideAuthServiceProps) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false)

	const { setSessionToken } = useSessionTokenService()
	const { queries } = useAuthDataService()

	const { data: session } = useQuery({ ...queries.session(), enabled: isAuthenticated })
	const { data: userInformation } = useQuery({
		...queries.userInformation(),
		enabled: Boolean(session)
	})

	const value = useMemo((): AuthServiceContextProps => {
		return {}
	}, [])
	return <AuthServiceContext.Provider value={value}>{children}</AuthServiceContext.Provider>
}
