import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { useAPIClientsService } from "./APIClientsService"

const usersKeys = {
	all: ["users"] as const,
	byId: (id: string) => [...usersKeys.all, "byId", id] as const
}

export const useUsers = () => {
	const { usersClient } = useAPIClientsService()
	return useQuery({
		queryKey: usersKeys.all,
		queryFn: () => usersClient.getUsers()
	})
}

export const useDeleteUser = () => {
	const queryClient = useQueryClient()
	const { usersClient } = useAPIClientsService()
	return useMutation({
		mutationFn: (userId: string) => usersClient.deleteUser(userId),
		onSuccess: () => {
			queryClient.invalidateQueries(usersKeys.all)
		}
	})
}
