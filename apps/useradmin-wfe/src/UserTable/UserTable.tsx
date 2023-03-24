import { Fragment, useMemo, useState } from "react"

import { IUserDTO } from "@prt/clients"

import { UserTableRow } from "./UserTableRow"

export interface UserTableProps {
	users: IUserDTO[]
	setUsers?: (users: IUserDTO[]) => unknown
}

type SortableColumns = "userName" | "firstName" | "lastName" | "email"

export const UserTable = ({ users: initialUsers }: UserTableProps) => {
	const [users, setUsers] = useState(initialUsers)
	const [sortByColumn, setSortByColumn] = useState<SortableColumns>("userName")
	const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

	const sortedUsers = useMemo(() => {
		const usersToSort = users.slice(0)
		usersToSort.sort((a, b) => {
			const propertyOnA = a[sortByColumn] ?? ""
			const propertyOnB = b[sortByColumn] ?? ""
			if (sortDirection === "asc") {
				return propertyOnA.localeCompare(propertyOnB)
			}
			return propertyOnB.localeCompare(propertyOnA)
		})
		return usersToSort
	}, [users, sortByColumn, sortDirection])

	const sortDirectionArrow = sortDirection === "asc" ? "⏬" : "⏫"

	const sortBy = (column: SortableColumns) => () => {
		if (sortByColumn === column) {
			setSortDirection((oldDirection) => {
				if (oldDirection === "asc") return "desc"
				return "asc"
			})
			return
		}

		setSortByColumn(column)
		setSortDirection("asc")
	}
	const setUser = (user: IUserDTO) => {
		const userIndexToUpdate = initialUsers.findIndex((aUser) => aUser.id === user.id)
		if (userIndexToUpdate < 0) return
		const userToUpdate = initialUsers[userIndexToUpdate]
		const newUser = {
			...userToUpdate,
			...user
		}

		const newUsers = initialUsers.slice(0)
		newUsers.splice(userIndexToUpdate, 1, newUser)
		setUsers(newUsers)
	}

	return (
		<table>
			<thead>
				<tr>
					<th onClick={sortBy("userName")}>
						User name {sortByColumn === "userName" && sortDirectionArrow}
					</th>
					<th onClick={sortBy("firstName")}>
						First name {sortByColumn === "firstName" && sortDirectionArrow}
					</th>
					<th onClick={sortBy("lastName")}>
						Last name {sortByColumn === "lastName" && sortDirectionArrow}
					</th>
					<th onClick={sortBy("email")}>E-mail {sortByColumn === "email" && sortDirectionArrow}</th>
				</tr>
			</thead>
			<tbody>
				{sortedUsers.map((user) => (
					<Fragment key={user.id}>
						<UserTableRow user={user} setUser={setUser} />
					</Fragment>
				))}
			</tbody>
		</table>
	)
}
