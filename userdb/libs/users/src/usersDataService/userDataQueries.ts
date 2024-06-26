import { queryOptions } from "@tanstack/react-query"
import { MutableRefObject } from "react"

import { UsersControllerClient } from "@react-workshop/userdb-api-clients"

export const createUserDataQueries = (usersClient: MutableRefObject<UsersControllerClient>) => {
	const queries = {
		users: () => ["users"],

		all: () =>
			queryOptions({
				queryKey: [...queries.users(), "all"],
				queryFn: ({ signal }) => usersClient.current.getUsers(signal),
				staleTime: 1000 * 60 * 10 // 10 minutes
			}),
		byId: (id: string) =>
			queryOptions({
				queryKey: [...queries.users(), "byId", id],
				queryFn: ({ signal }) => usersClient.current.getUser(id, signal),
				staleTime: 1000 * 60 * 10 // 10 minutes
			})
	} as const
	return queries
}

export type UsersDataQueries = ReturnType<typeof createUserDataQueries>
