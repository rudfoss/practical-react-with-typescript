import { useState } from "react"

import { staticUsers } from "../staticUsers"

import { UsersTable, UsersTableProps } from "./UsersTable"

export const UsersTableStaticUsers = () => {
	const [modifiedUsers, setModifiedUsers] = useState([...staticUsers])

	const saveUser: UsersTableProps["saveUser"] = (updatedUser) => {
		const newUsers = modifiedUsers.slice(0)
		const userIndex = newUsers.findIndex((user) => user.id === updatedUser.id)
		newUsers.splice(userIndex, 1, updatedUser)
		setModifiedUsers(newUsers)
	}

	return <UsersTable users={modifiedUsers} saveUser={saveUser} />
}
