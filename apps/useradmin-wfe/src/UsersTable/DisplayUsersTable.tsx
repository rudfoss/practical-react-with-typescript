import { useUsers } from "@prt/data"

import { UsersTable } from "./UsersTable"

export const DisplayUsersTable = () => {
	const { data: users = [], isLoading } = useUsers()

	if (isLoading) {
		return <p>Loading...</p>
	}

	return <UsersTable users={users} />
}
