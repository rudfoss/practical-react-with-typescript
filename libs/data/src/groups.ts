import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { useAPIClientsService } from "./APIClientsService"

const groupsKeys = {
	all: ["groups"] as const
}

export const useGroups = () => {
	const { groupsClient } = useAPIClientsService()
	return useQuery({
		queryKey: groupsKeys.all,
		queryFn: () => groupsClient.getGroups()
	})
}

export const useDeleteGroup = () => {
	const queryClient = useQueryClient()
	const { groupsClient } = useAPIClientsService()
	return useMutation({
		mutationFn: (groupId: string) => groupsClient.deleteGroup(groupId),
		onSuccess: () => {
			queryClient.invalidateQueries(groupsKeys.all)
		}
	})
}
