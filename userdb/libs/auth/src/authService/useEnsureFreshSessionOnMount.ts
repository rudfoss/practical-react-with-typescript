import { useEffect, useRef } from "react"

import { useRefreshSession } from "../authDataService"

import { useAuthService } from "./authService"

/**
 * Small hooks that ensures the session is refreshed if it expires in less than the provided time (default 5 minutes)
 */
export const useEnsureFreshSessionOnMount = (refreshIfExpiresIn = 1000 * 60 * 5) => {
	const { session } = useAuthService()
	const { mutate: refreshSession } = useRefreshSession()
	const hasRefreshed = useRef(false)

	useEffect(() => {
		if (!session || hasRefreshed.current) return
		const now = Date.now()
		if (session.expiresAt <= now) return
		if (session.expiresAt + refreshIfExpiresIn > now) {
			refreshSession()
			hasRefreshed.current = true
		}
	}, [refreshIfExpiresIn, refreshSession, session])
}
