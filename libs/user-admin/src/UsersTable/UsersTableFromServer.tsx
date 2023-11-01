import { useUsers } from "../data"

import { UsersTable } from "./UsersTable"

export const UsersTableFromServer = () => {
	const { data, isLoading } = useUsers()

	if (isLoading || !data) {
		return <p>Loading...</p>
	}

	return <UsersTable users={data} />
}
