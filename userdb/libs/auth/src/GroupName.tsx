import { useQuery } from "@tanstack/react-query"

import { useApiClientsService } from "@react-workshop/userdb-api-clients"

export interface GroupNameProps {
	groupId: string
}

export const GroupName = ({ groupId }: GroupNameProps) => {
	const { groupsClient } = useApiClientsService()
	const { data: group } = useQuery({
		queryKey: ["groups", "byId", groupId],
		queryFn: () => groupsClient.current.getGroup(groupId)
	})

	if (group) {
		return group.displayName
	}

	return groupId
}
