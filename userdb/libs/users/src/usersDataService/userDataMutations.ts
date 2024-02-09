import { useMutation, useQueryClient } from "@tanstack/react-query"

import { NewUser, PatchUser } from "@react-workshop/userdb-api-client"

import { useUsersDataService } from "./usersDataService"

export const useCreateUser = () => {
	const queryClient = useQueryClient()
	const { usersClient, queries } = useUsersDataService()

	return useMutation({
		mutationFn: (newUser: NewUser) => usersClient.createUser(newUser),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: queries.all().queryKey
			})
		}
	})
}

export const useUpdateUser = () => {
	const queryClient = useQueryClient()
	const { usersClient, queries } = useUsersDataService()

	return useMutation({
		mutationFn: ({ userId, patchUser }: { userId: string; patchUser: PatchUser }) =>
			usersClient.updateUser(userId, patchUser),
		onSuccess: async (updatedUser) => {
			await queryClient.invalidateQueries({
				queryKey: queries.all().queryKey
			})
			await queryClient.invalidateQueries({
				queryKey: queries.byId(updatedUser.id).queryKey
			})
		}
	})
}

export const useDeleteUser = () => {
	const queryClient = useQueryClient()
	const { usersClient, queries } = useUsersDataService()

	return useMutation({
		mutationFn: (userId: string) => usersClient.deleteUser(userId),
		onSuccess: async (deletedUser) => {
			await queryClient.invalidateQueries({
				queryKey: queries.all().queryKey
			})
			queryClient.removeQueries({
				queryKey: queries.byId(deletedUser.id).queryKey
			})
		}
	})
}
