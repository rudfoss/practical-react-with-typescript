import { useQuery } from "@tanstack/react-query"

import { User } from "../users"

const fetchUsers = async (): Promise<User[]> => {
	const response = await fetch("http://localhost:4210/users")
	return await response.json()
}

export const useUsers = () => {
	return useQuery({
		queryKey: ["users"],
		queryFn: fetchUsers
	})
}
