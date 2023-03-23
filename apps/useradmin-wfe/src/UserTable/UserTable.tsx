import { Fragment, useMemo, useState } from "react"

import { StaticUser } from "@prt/data"

import { UserTableRow } from "./UserTableRow"

export interface UserTableProps {
	users: StaticUser[]
}

type SortableColumns = "userName" | "firstName" | "lastName" | "email"

export const UserTable = ({ users: initialUsers }: UserTableProps) => {
	const [users, setUsers] = useState(initialUsers)
	const [sortByColumn, setSortByColumn] = useState<SortableColumns>("userName")
	const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

	const sortedUsers = useMemo(() => {
		const usersToSort = users.slice(0)
		usersToSort.sort((a, b) => {
			const propertyOnA = a[sortByColumn]
			const propertyOnB = b[sortByColumn]
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
						<UserTableRow user={user} />
					</Fragment>
				))}
			</tbody>
		</table>
	)
}
