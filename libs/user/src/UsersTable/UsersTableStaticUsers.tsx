import { useMemo, useState } from "react"

import { TextField } from "@prwt/fields"

import { staticUsers } from "../staticUsers"

import { UsersTable, UsersTableProps } from "./UsersTable"

export const UsersTableStaticUsers = () => {
	const [modifiedUsers, setModifiedUsers] = useState([...staticUsers])
	const [searchQuery, setSearchQuery] = useState("")

	const filteredUsers = useMemo(() => {
		if (searchQuery.trim() === "") return modifiedUsers
		const words = searchQuery
			.toLocaleLowerCase()
			.split(/\s+/)
			.filter((word) => word.trim() !== "")

		return modifiedUsers.filter((user) => {
			const propsToSearch =
				`${user.firstName} ${user.lastName} ${user.email}`.toLocaleLowerCase()

			return words.some((word) => propsToSearch.includes(word))
		})
	}, [modifiedUsers, searchQuery])

	const saveUser: UsersTableProps["saveUser"] = (updatedUser) => {
		const newUsers = modifiedUsers.slice(0)
		const userIndex = newUsers.findIndex((user) => user.id === updatedUser.id)
		newUsers.splice(userIndex, 1, updatedUser)
		setModifiedUsers(newUsers)
	}

	return (
		<>
			<TextField
				label="Search for a user"
				value={searchQuery}
				onChange={setSearchQuery}
			/>
			<UsersTable users={filteredUsers} saveUser={saveUser} />
		</>
	)
}
