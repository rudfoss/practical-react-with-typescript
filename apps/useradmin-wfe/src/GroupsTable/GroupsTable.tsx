import { useMemo, useState } from "react"

import { GroupDTO } from "@prt/data"

import { GroupsTableRow } from "./GroupsTableRow"

export interface GroupsTableProps {
	groups: GroupDTO[]
}

type SortableColumns = "id" | "name" | "role"
type SortDirection = "asc" | "desc"

export const GroupsTable = ({ groups }: GroupsTableProps) => {
	const [sortByColumn, setSortByColumn] = useState<SortableColumns>("id")
	const [sortDirection, setSortDirection] = useState<SortDirection>("asc")

	const sortDirectionIcon = sortDirection === "asc" ? "⏬" : "⏫"
	const sortedGroups = useMemo(() => {
		const groupsToSort = groups.slice(0)
		groupsToSort.sort((a, b) => {
			const columnFromA = a[sortByColumn] ?? ""
			const columnFromB = b[sortByColumn] ?? ""
			if (sortDirection === "asc") {
				return columnFromA.localeCompare(columnFromB)
			}
			return columnFromB.localeCompare(columnFromA)
		})
		return groupsToSort
	}, [sortByColumn, sortDirection, groups])

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
		<table>
			<thead>
				<tr>
					<th onClick={sortBy("id")}>Id {sortByColumn === "id" && sortDirectionIcon}</th>
					<th onClick={sortBy("name")}>Name {sortByColumn === "name" && sortDirectionIcon}</th>
					<th onClick={sortBy("role")}>Role {sortByColumn === "role" && sortDirectionIcon}</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{sortedGroups.map((group) => (
					<GroupsTableRow key={group.id} group={group} />
				))}
			</tbody>
		</table>
	)
}
