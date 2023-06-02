import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { IUserDTO, UserDTO } from "@prwt/useradmin-wbe-client"

import { UserDetails } from "./UserDetails"
import { useUserApiService } from "./userApiService"

export interface UserDetailsServerProps {
	userId: string
}

export const UserDetailsServer = ({ userId }: UserDetailsServerProps) => {
	const { usersClient } = useUserApiService()
	const queryClient = useQueryClient()
	const { data: user, isLoading } = useQuery({
		queryKey: ["users", "byId", userId],
		queryFn: () => usersClient.getUser(userId)
	})

	const { mutate: saveUser } = useMutation({
		mutationFn: (updatedUser: IUserDTO) =>
			usersClient.updateUser(new UserDTO(updatedUser)),
		onSuccess: () => {
			queryClient.invalidateQueries(["users"])
		}
	})

	if (isLoading) {
		return <p>Loading user {userId}...</p>
	}

	if (!user) {
		return <p>No such user</p>
	}

	return <UserDetails user={user} onSave={saveUser} />
}
