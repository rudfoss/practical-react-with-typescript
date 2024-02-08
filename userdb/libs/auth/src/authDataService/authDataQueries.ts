import { queryOptions } from "@tanstack/react-query"

import { IAuthControllerClient, IAuthUserControllerClient } from "@react-workshop/userdb-api-client"

/**
 * Binds query options to their underlying clients to simplify their use.
 * This is **NOT** intended to be used as a hook. Instead call it once and then use a service or state to provide the result.
 * @param authClient
 * @param authUserClient
 * @returns
 */
export const createAuthDataQueries = (
	authClient: IAuthControllerClient,
	authUserClient: IAuthUserControllerClient
) => {
	const queries = {
		user: () => ["user"],

		session: () =>
			queryOptions({
				queryKey: [...queries.user(), "session"],
				queryFn: () => authUserClient.getSession(),
				staleTime: 1000 * 60 * 5 // 5 minutes
			}),
		userInformation: () =>
			queryOptions({
				queryKey: [...queries.user(), "information"],
				queryFn: () => authUserClient.getCurrentUser(),
				staleTime: 1000 * 60 * 5 // 5 minutes
			}),

		sessions: () =>
			queryOptions({
				queryKey: ["sessions"],
				queryFn: () => authClient.getActiveSessions(),
				staleTime: 1000 * 60 * 5
			})
	} as const

	return queries
}

export type AuthDataQueries = ReturnType<typeof createAuthDataQueries>
