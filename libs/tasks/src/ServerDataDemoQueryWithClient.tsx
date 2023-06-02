import { useQuery } from "@tanstack/react-query"

import { useUserApiService } from "@prwt/user"

export const ServerDataDemoQueryWithClient = () => {
	const { usersClient } = useUserApiService()
	const {
		data: users = [],
		isLoading,
		error
	} = useQuery({
		queryKey: ["users"],
		queryFn: () => usersClient.getUsers()
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
