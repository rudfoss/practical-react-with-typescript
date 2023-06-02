import { useEffect, useState } from "react"

import { User } from "@prwt/user"

const fetchUsers = async () => {
	await new Promise<void>((resolve) => setTimeout(() => resolve(), 10000))
	const response = await fetch("http://localhost:4210/users")
	if (!response.ok) {
		throw new Error("Request failed")
	}

	const users = await response.json()
	return users
}

export const ServerDataDemo = () => {
	const [users, setUsers] = useState<User[]>()
	const [error, setError] = useState<Error>()

	useEffect(() => {
		let cancelled = false
		const fetchUsersInternal = async () => {
			try {
				const users = await fetchUsers()
				if (cancelled) return
				setUsers(users)
			} catch (error) {
				setError(error as any)
			}
		}
		fetchUsersInternal()

		return () => {
			cancelled = true
		}
	}, [])

	if (error) {
		return <p>Something failed {error.message}</p>
	}

	if (!users) {
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
