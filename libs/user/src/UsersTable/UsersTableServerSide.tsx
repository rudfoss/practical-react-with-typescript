import { useQuery } from "@tanstack/react-query"

import { useUserApiService } from "../userApiService"

import { UsersTable } from "./UsersTable"

export const UsersTableServerSide = () => {
	const { usersClient } = useUserApiService()
	const { data: users = [], isLoading } = useQuery({
		queryKey: ["users"],
		queryFn: () => usersClient.getUsers()
	})

	if (isLoading) {
		return <p>loading...</p>
	}

	return <UsersTable users={users} />
}
