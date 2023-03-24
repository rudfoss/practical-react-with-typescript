import { useMemo, useState } from "react"

import { UserDTO } from "@prt/data"

import { useRandom } from "../useRandom"

import { UsersTableRow } from "./UsersTableRow"

export interface UsersTableProps {
	users: UserDTO[]
}

type SortableColumns = "userName" | "firstName" | "lastName" | "email"
type SortDirection = "asc" | "desc"

export const UsersTable = ({ users: initialUsers }: UsersTableProps) => {
	const [sortByColumn, setSortByColumn] = useState<SortableColumns>("firstName")
	const [sortDirection, setSortDirection] = useState<SortDirection>("asc")

	const randomValue = useRandom(sortByColumn)

	const sortDirectionIcon = sortDirection === "asc" ? "⏬" : "⏫"
	const sortedUsers = useMemo(() => {
		const usersToSort = initialUsers.slice(0)
		usersToSort.sort((a, b) => {
			const columnFromA = a[sortByColumn] ?? ""
			const columnFromB = b[sortByColumn] ?? ""
			if (sortDirection === "asc") {
				return columnFromA.localeCompare(columnFromB)
			}
			return columnFromB.localeCompare(columnFromA)
		})
		return usersToSort
	}, [initialUsers, sortByColumn, sortDirection])

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

	return (
		<>
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
						<th onClick={sortBy("email")}>
							E-mail {sortByColumn === "email" && sortDirectionIcon}
						</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{sortedUsers.map((user) => (
						<UsersTableRow key={user.id} user={user} />
					))}
				</tbody>
			</table>
			<p>Random value: {randomValue}</p>
		</>
	)
}
