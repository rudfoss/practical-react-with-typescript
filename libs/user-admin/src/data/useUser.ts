import { useMutation, useQuery } from "@tanstack/react-query"

import { User } from "../users"

const fetchUser = async (userId: string): Promise<User> => {
	const response = await fetch(`http://localhost:4210/users/${userId}`)
	return await response.json()
}
const mutateUser = async (newUser: User): Promise<User> => {
	const response = await fetch(`http://localhost:4210/users`, {
		method: "PUT",
		body: JSON.stringify(newUser),
		headers: {
			"content-type": "application/json"
		}
	})
	return await response.json()
}

export const useUser = (userId: string) => {
	const user = useQuery({
		queryKey: ["user", userId],
		queryFn: () => fetchUser(userId)
	})
	const updateUser = useMutation({
		mutationFn: mutateUser
	})

	return { user, updateUser }
}
