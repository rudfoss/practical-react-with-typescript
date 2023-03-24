import { usersStatic } from "@prt/data"

import { UsersTable } from "./UsersTable"

export const DisplayUsersTable = () => {
	return <UsersTable users={usersStatic} />
}
