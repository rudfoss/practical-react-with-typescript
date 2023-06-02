import { useMemo, useState } from "react"

import { IUserDTO } from "@prwt/useradmin-wbe-client"

import { UsersTableRow } from "./UsersTableRow"
import { ColumnNames } from "./userTableTypes"

export interface UsersTableProps {
	users: IUserDTO[]
}

type SortableColumns = ColumnNames
type SortDirection = "asc" | "desc"

export const UsersTable = ({ users }: UsersTableProps) => {
	const [sortColumn, setSortColumn] = useState<SortableColumns>()
	const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
	const [columnOrder] = useState<ColumnNames[]>([
		"firstName",
		"lastName",
		"userName",
		"email"
	])

	const sortedUsers = useMemo(() => {
		if (!sortColumn) return users

		const sortableUsers = [...users]
		const reverse = sortDirection === "asc" ? 1 : -1

		sortableUsers.sort((a, b) => {
			const columnAValue = a[sortColumn] ?? ""
			const columnBValue = b[sortColumn] ?? ""
			return columnAValue.localeCompare(columnBValue) * reverse
		})
		return sortableUsers
	}, [sortColumn, sortDirection, users])

	const setColumnToSortBy = (columnName: SortableColumns) => () => {
		if (sortColumn === columnName) {
			setSortDirection(sortDirection === "asc" ? "desc" : "asc")
			return
		}
		setSortColumn(columnName)
		setSortDirection("asc")
	}

	return (
		<table>
			<thead>
				<tr>
					<th></th>
					{columnOrder.map((colName) => (
						<th
							key={colName}
							onClick={setColumnToSortBy(colName)}
							role="button"
							aria-roledescription="Sort by this column in ascending or descending order"
						>
							{colName}
							{colName === sortColumn && (
								<span>{sortDirection === "asc" ? "🔽" : "🔼"}</span>
							)}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{sortedUsers.map((user) => (
					<UsersTableRow columnOrder={columnOrder} key={user.id} user={user} />
				))}
			</tbody>
		</table>
	)
}
