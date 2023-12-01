import { useQuery } from "@tanstack/react-query"
import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState
} from "react"

import { UserSession } from "@prwt/generated/store-api"

export interface AuthServiceContextProps {
	isAuthenticated: boolean
	userSession?: UserSession
}

const AuthServiceContext = createContext<AuthServiceContextProps | undefined>(
	undefined
)
AuthServiceContext.displayName = "AuthServiceContext"

export const useAuthService = () => {
	const ctx = useContext(AuthServiceContext)
	if (!ctx) throw new Error("AuthService must be provided before use")
	return ctx
}

export interface ProvideAuthServiceProps {
	children: React.ReactNode
}

export const ProvideAuthService = ({ children }: ProvideAuthServiceProps) => {
	const { data: sessionData } = useQuery({
		queryKey: ["userSession"],
		queryFn: (): UserSession => undefined as unknown as UserSession
	})

	const value = useMemo((): AuthServiceContextProps => {
		return {
			isAuthenticated: !!sessionData,
			userSession: sessionData
		}
	}, [sessionData])

	return (
		<AuthServiceContext.Provider value={value}>
			{children}
		</AuthServiceContext.Provider>
	)
}
