import { useQuery } from "@tanstack/react-query"
import { ReactNode, createContext, useContext } from "react"

import {
	Group,
	LoginRequest,
	User,
	UserDatabaseRole,
	UserSession
} from "@react-workshop/userdb-api-clients"

import { useAuthDataService, useLogin, useLogout, useRefreshSession } from "../authDataService"

export interface AuthServiceContextProps {
	login: (loginData: LoginRequest) => unknown
	logout: () => unknown
	refreshSession: () => unknown

	isWorking: boolean
	loginError: Error | null
	logoutError: Error | null
	refreshSessionError: Error | null

	session?: UserSession
	user?: User
	roles?: UserDatabaseRole[]
	groups?: Group[]
}

const AuthServiceContext = createContext<AuthServiceContextProps | undefined>(undefined)
AuthServiceContext.displayName = "AuthServiceContext"

export const useAuthService = () => {
	const context = useContext(AuthServiceContext)
	if (!context) throw new Error("AuthService must be provided before use")
	return context
}

export interface ProvideAuthServiceProps {
	children: ReactNode
}

export const ProvideAuthService = ({ children }: ProvideAuthServiceProps) => {
	const { queries } = useAuthDataService()

	const { mutate: login, error: loginError, isPending: isLoggingIn } = useLogin()
	const { mutate: logout, error: logoutError, isPending: isLoggingOut } = useLogout()
	const {
		mutate: refreshSession,
		error: refreshSessionError,
		isPending: isRefreshingSession
	} = useRefreshSession()

	const { data: session } = useQuery(queries.session())
	const { data: userInformation } = useQuery(queries.userInformation())

	const isWorking = isLoggingIn || isLoggingOut || isRefreshingSession

	return (
		<AuthServiceContext.Provider
			value={{
				login,
				logout,
				refreshSession,

				isWorking,
				loginError,
				logoutError,
				refreshSessionError,

				session,
				user: userInformation?.user,
				roles: userInformation?.roles,
				groups: userInformation?.groups
			}}
		>
			{children}
		</AuthServiceContext.Provider>
	)
}
