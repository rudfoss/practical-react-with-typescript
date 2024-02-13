import { useMutation, useQueryClient } from "@tanstack/react-query"

import { NewUser, PatchUser, useApiClientsService } from "@react-workshop/userdb-api-clients"

import { useUsersDataService } from "./usersDataService"

export const useCreateUser = () => {
	const queryClient = useQueryClient()
	const { usersClient } = useApiClientsService()
	const { queries } = useUsersDataService()

	return useMutation({
		mutationFn: (newUser: NewUser) => usersClient.current.createUser(newUser),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: queries.all().queryKey
			})
		}
	})
}

export const useUpdateUser = () => {
	const queryClient = useQueryClient()
	const { usersClient } = useApiClientsService()
	const { queries } = useUsersDataService()

	return useMutation({
		mutationFn: ({ userId, patchUser }: { userId: string; patchUser: PatchUser }) =>
			usersClient.current.updateUser(userId, patchUser),
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
	const { usersClient } = useApiClientsService()
	const { queries } = useUsersDataService()

	return useMutation({
		mutationFn: (userId: string) => usersClient.current.deleteUser(userId),
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
