import { queryOptions } from "@tanstack/react-query"

import { GroupsControllerClient } from "@react-workshop/userdb-api-clients"

export const createGroupsDataQueries = (groupsClient: GroupsControllerClient) => {
	const queries = {
		groups: () => ["groups"],

		all: () =>
			queryOptions({
				queryKey: [...queries.groups(), "all"],
				queryFn: ({ signal }) => groupsClient.getGroups(signal),
				staleTime: 1000 * 60 * 10 // 10 minutes
			}),
		byId: (id: string) =>
			queryOptions({
				queryKey: [...queries.groups(), "byId", id],
				queryFn: ({ signal }) => groupsClient.getGroup(id, signal),
				staleTime: 1000 * 60 * 10 // 10 minutes
			})
	} as const

	return queries
}

export type GroupsDataQueries = ReturnType<typeof createGroupsDataQueries>
