import { queryOptions } from "@tanstack/react-query"

import type {
	AuthControllerClient,
	AuthUserControllerClient
} from "@react-workshop/userdb-api-client"

/**
 * Binds query options to their underlying clients to simplify their use.
 * This is **NOT** intended to be used as a hook. Instead call it once and then use a service or state to provide the result.
 * @param authClient
 * @param authUserClient
 * @returns
 */
export const createAuthDataQueries = (
	authClient: AuthControllerClient,
	authUserClient: AuthUserControllerClient,
	isSessionTokenAvailable = false
) => {
	const queries = {
		currentUser: () => ["currentUser"],

		session: () =>
			queryOptions({
				queryKey: [...queries.currentUser(), "session"],
				queryFn: ({ signal }) => authUserClient.getSession(undefined, signal),
				enabled: isSessionTokenAvailable,
				staleTime: 1000 * 60 * 5 // 5 minutes
			}),
		userInformation: () =>
			queryOptions({
				queryKey: [...queries.currentUser(), "information"],
				queryFn: ({ signal }) => authUserClient.getCurrentUser(signal),
				enabled: isSessionTokenAvailable,
				staleTime: 1000 * 60 * 5 // 5 minutes
			}),

		sessions: () =>
			queryOptions({
				queryKey: ["sessions"],
				queryFn: ({ signal }) => authClient.getActiveSessions(signal),
				enabled: isSessionTokenAvailable,
				staleTime: 1000 * 60 * 5
			})
	} as const

	return queries
}

export type AuthDataQueries = ReturnType<typeof createAuthDataQueries>
