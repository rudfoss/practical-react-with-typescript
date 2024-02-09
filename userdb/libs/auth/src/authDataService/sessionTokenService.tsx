import { createContext, useCallback, useContext, useMemo, useState } from "react"

import { setBearerToken } from "@react-workshop/userdb-api-client"

export interface SessionTokenServiceContextProps {
	sessionToken?: string
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

/**
 * Provides facilities to set and clear the session token for all API client instances.
 * @returns
 */
export const ProvideSessionTokenService = ({ children }: ProvideSessionTokenServiceProps) => {
	const [sessionToken, internalSetSessionToken] = useState<string>()

	/**
	 * Why not just useEffect to pass token to clients?
	 * When you refresh a session the old token immediately becomes invalid. The `useRefreshSession` custom hook invalidates the session query in the cache which causes React Query to immediately trigger a reload of that data if it is in use (which it usually is). Since useEffect fires only on the next render cycle this causes the underlying clients to use the old token for the immediate fetch call which in turn will immediately trigger a "forbidden" response.
	 *
	 * To handle this properly we synchronously update the bearer token on the clients as soon as any new data arrives. Then we can safely invalidate the cache of any authenticated call and any new refetches will use the new token.
	 */
	const setSessionToken = useCallback((newSessionToken?: string) => {
		setBearerToken(newSessionToken)
		internalSetSessionToken(newSessionToken)
	}, [])

	const value = useMemo((): SessionTokenServiceContextProps => {
		return { sessionToken, setSessionToken }
	}, [sessionToken, setSessionToken])
	return (
		<SessionTokenServiceContext.Provider value={value}>
			{children}
		</SessionTokenServiceContext.Provider>
	)
}
