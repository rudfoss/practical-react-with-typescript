import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"

import { User } from "@prwt/user"

const fetchUsers = async () => {
	await new Promise<void>((resolve) => setTimeout(() => resolve(), 5000))
	const response = await fetch("http://localhost:4210/users")
	if (!response.ok) {
		throw new Error("Request failed")
	}

	const users: User[] = await response.json()
	return users
}

export const ServerDataDemoQuery = () => {
	const {
		data: users = [],
		isLoading,
		error
	} = useQuery({
		queryKey: ["users"],
		queryFn: fetchUsers
	})

	if (error) {
		return <p>Something failed</p>
	}

	if (isLoading) {
		return <p>Loading users...</p>
	}

	return (
		<ul>
			{users.map((user) => (
				<li key={user.id}>{user.userName}</li>
			))}
		</ul>
	)
}
