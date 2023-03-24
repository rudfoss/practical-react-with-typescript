import { useQuery } from "@tanstack/react-query"

import { useAPIClients } from "./apiClientsService"

const userKeys = {
	all: ["users"] as const
}

export const useUsers = () => {
	const { usersClient } = useAPIClients()
	return useQuery({
		queryKey: userKeys.all,
		queryFn: () => usersClient.getUsers()
	})
}
