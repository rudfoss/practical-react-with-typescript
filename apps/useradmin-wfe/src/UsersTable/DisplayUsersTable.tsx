import { UsersTable } from "./UsersTable"
import { usersStatic } from "./usersStatic"

export const DisplayUsersTable = () => {
	return <UsersTable users={usersStatic} />
}
