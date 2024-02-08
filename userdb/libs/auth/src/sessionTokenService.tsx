import { createContext, useContext, useEffect, useMemo, useState } from "react"

import { setBearerToken } from "@react-workshop/userdb-api-client"

export interface SessionTokenServiceContextProps {
	setSessionToken: (newSessionToken?: string) => unknown
}

const SessionTokenServiceContext = createContext<SessionTokenServiceContextProps | undefined>(
	undefined
)
SessionTokenServiceContext.displayName = "SessionTokenServiceContext"

export const useSessionTokenService = () => {
	const context = useContext(SessionTokenServiceContext)
	if (!context) throw new Error("SessionTokenService must be provided before use")
	return context
}

export interface ProvideSessionTokenServiceProps {
	children: React.ReactNode
}

export const ProvideSessionTokenService = ({ children }: ProvideSessionTokenServiceProps) => {
	const [sessionToken, setSessionToken] = useState<string>()

	useEffect(() => {
		setBearerToken(sessionToken)
	}, [sessionToken])

	const value = useMemo((): SessionTokenServiceContextProps => {
		return { setSessionToken }
	}, [])
	return (
		<SessionTokenServiceContext.Provider value={value}>
			{children}
		</SessionTokenServiceContext.Provider>
	)
}
