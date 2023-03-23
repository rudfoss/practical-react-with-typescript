import { staticUsers } from "@prt/data"

import { UserTable } from "../../UserTable"

export const UsersPage = () => {
	return <UserTable users={staticUsers} />
}
