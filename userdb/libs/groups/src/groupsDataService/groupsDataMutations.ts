import { useMutation, useQueryClient } from "@tanstack/react-query"

import { NewGroup, PatchGroup, useApiClientsService } from "@react-workshop/userdb-api-clients"

import { useGroupsDataService } from "./groupsDataService"

export const useCreateGroup = () => {
	const queryClient = useQueryClient()
	const { groupsClient } = useApiClientsService()
	const { queries } = useGroupsDataService()

	return useMutation({
		mutationFn: (newGroup: NewGroup) => groupsClient.current.createGroup(newGroup),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: queries.all().queryKey
			})
		}
	})
}

export const useUpdateGroup = () => {
	const queryClient = useQueryClient()
	const { groupsClient } = useApiClientsService()
	const { queries } = useGroupsDataService()

	return useMutation({
		mutationFn: ({ groupId, patchGroup }: { groupId: string; patchGroup: PatchGroup }) =>
			groupsClient.current.updateGroup(groupId, patchGroup),
		onSuccess: async (updatedGroup) => {
			await queryClient.invalidateQueries({
				queryKey: queries.all().queryKey
			})
			await queryClient.invalidateQueries({
				queryKey: queries.byId(updatedGroup.id).queryKey
			})
		}
	})
}

export const useDeleteGroup = () => {
	const queryClient = useQueryClient()
	const { groupsClient } = useApiClientsService()
	const { queries } = useGroupsDataService()

	return useMutation({
		mutationFn: (groupId: string) => groupsClient.current.deleteGroup(groupId),
		onSuccess: async (deletedGroup) => {
			await queryClient.invalidateQueries({
				queryKey: queries.all().queryKey
			})
			queryClient.removeQueries({
				queryKey: queries.byId(deletedGroup.id).queryKey
			})
		}
	})
}
