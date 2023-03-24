import { useQuery } from "@tanstack/react-query"

import { User } from "./usersStatic"

export const useUsers = () => {
	return useQuery({
		queryKey: ["users"],
		queryFn: async () => {
			const response = await fetch("http://localhost:4210/users")
			const data = await response.json()
			return data as User[]
		}
	})
}
