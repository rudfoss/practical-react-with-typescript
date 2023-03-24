import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { User } from "./usersStatic"

const usersKeys = {
	all: ["users"] as const,
	byId: (id: string) => [...usersKeys.all, "byId", id] as const
}

export const useUsers = () => {
	return useQuery({
		queryKey: usersKeys.all,
		queryFn: async () => {
			const response = await fetch("http://localhost:4210/users")
			const data = await response.json()
			return data as User[]
		}
	})
}

export const useDeleteUser = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (userId: string) =>
			fetch(`http://localhost:4210/users/${userId}`, {
				method: "DELETE"
			}),
		onSuccess: () => {
			queryClient.invalidateQueries(usersKeys.all)
		}
	})
}
