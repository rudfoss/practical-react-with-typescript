import { queryOptions } from "@tanstack/react-query"
import { MutableRefObject } from "react"

import { AuthControllerClient, AuthUserControllerClient } from "@react-workshop/userdb-api-clients"

/**
 * Binds query options to their underlying clients to simplify their use.
 * This is **NOT** intended to be used as a hook. Instead call it once and then use a service or state to provide the result.
 * @param authClient
 * @param authUserClient
 * @returns
 */
export const createAuthDataQueries = (
	authClient: MutableRefObject<AuthControllerClient>,
	authUserClient: MutableRefObject<AuthUserControllerClient>,
	isEnabled = false
) => {
	const queries = {
		currentUser: () => ["currentUser"],

		session: () =>
			queryOptions({
				queryKey: [...queries.currentUser(), "session"],
				queryFn: ({ signal }) => authUserClient.current.getSession(undefined, signal),
				enabled: isEnabled,
				staleTime: 1000 * 60 * 5 // 5 minutes
			}),
		userInformation: () =>
			queryOptions({
				queryKey: [...queries.currentUser(), "information"],
				queryFn: ({ signal }) => authUserClient.current.getCurrentUser(signal),
				enabled: isEnabled,
				staleTime: 1000 * 60 * 5 // 5 minutes
			}),

		sessions: () =>
			queryOptions({
				queryKey: ["sessions"],
				queryFn: ({ signal }) => authClient.current.getActiveSessions(signal),
				enabled: isEnabled,
				refetchInterval: 1000 * 10,
				staleTime: 1000 * 10
			})
	} as const

	return queries
}

export type AuthDataQueries = ReturnType<typeof createAuthDataQueries>
