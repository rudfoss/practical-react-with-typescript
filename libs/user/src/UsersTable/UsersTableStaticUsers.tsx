import { useMemo, useState } from "react"

import { TextField } from "@prwt/fields"

import { staticUsers } from "../staticUsers"

import { UsersTable } from "./UsersTable"

export const UsersTableStaticUsers = () => {
	const [searchQuery, setSearchQuery] = useState("")

	const filteredUsers = useMemo(() => {
		if (searchQuery.trim() === "") return staticUsers
		const words = searchQuery
			.toLocaleLowerCase()
			.split(/\s+/)
			.filter((word) => word.trim() !== "")

		return staticUsers.filter((user) => {
			const propsToSearch =
				`${user.firstName} ${user.lastName} ${user.email}`.toLocaleLowerCase()

			return words.some((word) => propsToSearch.includes(word))
		})
	}, [searchQuery])

	return (
		<>
			<TextField
				label="Search for a user"
				value={searchQuery}
				onChange={setSearchQuery}
			/>
			<UsersTable users={filteredUsers} />
		</>
	)
}
