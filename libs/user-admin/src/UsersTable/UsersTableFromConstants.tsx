import { users } from "../users"

import { UsersTable } from "./UsersTable"

export const UsersTableFromConstants = () => {
	return <UsersTable users={users} />
}
