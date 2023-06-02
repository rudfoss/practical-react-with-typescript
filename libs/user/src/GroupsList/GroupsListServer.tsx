import { useQuery } from "@tanstack/react-query"

import { useUserApiService } from "../userApiService"

import { GroupsList } from "./GroupsList"

export const GroupsListServer = () => {
	const { groupsClient } = useUserApiService()
	const { data: groups = [], isLoading } = useQuery({
		queryKey: ["groups"],
		queryFn: () => groupsClient.getGroups()
	})

	if (isLoading) {
		return <p>Loading...</p>
	}

	return <GroupsList groups={groups} />
}
