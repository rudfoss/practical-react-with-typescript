import { useUsers } from "@prt/data"

import { UserTable } from "../../UserTable"

export const UsersPage = () => {
	const { data: users, isLoading } = useUsers()
	if (isLoading) {
		return <p>"loading..."</p>
	}

	if (!users) {
		return <p>No users returned from server. Something may be wrong.</p>
	}

	return <UserTable users={users} />
}
