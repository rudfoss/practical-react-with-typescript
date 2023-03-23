import { useMemo, useState } from "react"

import { UsersTableRow } from "./UsersTableRow"
import { User } from "./usersStatic"

export interface UsersTableProps {
	users: User[]
}

type SortableColumns = "userName" | "firstName" | "lastName" | "email"
type SortDirection = "asc" | "desc"

export const UsersTable = ({ users: initialUsers }: UsersTableProps) => {
	const [users, setUsers] = useState(initialUsers)
	const [sortByColumn, setSortByColumn] = useState<SortableColumns>("firstName")
	const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
	const sortDirectionIcon = sortDirection === "asc" ? "⏬" : "⏫"

	const sortedUsers = useMemo(() => {
		const usersToSort = users.slice(0)
		usersToSort.sort((a, b) => {
			const columnFromA = a[sortByColumn]
			const columnFromB = b[sortByColumn]
			if (sortDirection === "asc") {
				return columnFromA.localeCompare(columnFromB)
			}
			return columnFromB.localeCompare(columnFromA)
		})
		return usersToSort
	}, [users, sortByColumn, sortDirection])

	const sortBy = (columnName: SortableColumns) => () => {
		if (columnName === sortByColumn) {
			if (sortDirection === "asc") {
				setSortDirection("desc")
				return
			}
			setSortDirection("asc")
			return
		}

		setSortByColumn(columnName)
		setSortDirection("asc")
	}
	const setUser = (newUser: User) => {
		const userIndexToUpdate = users.findIndex((aUser) => aUser.id === newUser.id)
		if (userIndexToUpdate < 0) return
		const newUsers = [...users]
		newUsers.splice(userIndexToUpdate, 1, newUser)
		setUsers(newUsers)
	}

	return (
		<table>
			<thead>
				<tr>
					<th onClick={sortBy("userName")}>
						User name {sortByColumn === "userName" && sortDirectionIcon}
					</th>
					<th onClick={sortBy("firstName")}>
						First name {sortByColumn === "firstName" && sortDirectionIcon}
					</th>
					<th onClick={sortBy("lastName")}>
						Last name {sortByColumn === "lastName" && sortDirectionIcon}
					</th>
					<th onClick={sortBy("email")}>E-mail {sortByColumn === "email" && sortDirectionIcon}</th>
				</tr>
			</thead>
			<tbody>
				{sortedUsers.map((user) => (
					<UsersTableRow key={user.id} user={user} setUser={setUser} />
				))}
			</tbody>
		</table>
	)
}
