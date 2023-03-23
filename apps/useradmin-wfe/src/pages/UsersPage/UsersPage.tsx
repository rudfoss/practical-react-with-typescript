import { useState } from "react"

import { staticUsers } from "@prt/data"

import { UserTable } from "../../UserTable"

export const UsersPage = () => {
	const [users, setUsers] = useState(staticUsers)
	return <UserTable users={users} setUsers={setUsers} />
}
