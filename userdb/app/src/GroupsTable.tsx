import { useState } from "react"
import { StaticGroup } from "./StaticGroups"

type SortBy = "id" | "displayName" | "description"
type SortDirection = "ascending" | "descending"

export interface GroupsTableProps {
	groups: StaticGroup[]
}

export const GroupsTable = ({ groups }: GroupsTableProps) => {
	const [sortBy, setSortBy] = useState<SortBy>()
	const [sortDirection, setSortDirection] = useState<SortDirection>("ascending")

	const setOrToggleSort = (newSortBy: SortBy) => {
		if (newSortBy !== sortBy) {
			setSortBy(newSortBy)
			setSortDirection("ascending")
			return
		}

		setSortDirection(sortDirection === "ascending" ? "descending" : "ascending")
	}

	if (sortBy) {
		groups.sort((groupA, groupB) => {
			const reverse = sortDirection === "ascending" ? 1 : -1

			switch (sortBy) {
				case "id":
					return groupA.id.localeCompare(groupB.id) * reverse
				case "displayName":
					return groupA.displayName.localeCompare(groupB.displayName) * reverse
				case "description":
					return groupA.description.localeCompare(groupB.description) * reverse
			}
		})
	}

	return (
		<table>
			<thead>
				<tr>
					<th>
						<button type="button" onClick={() => setOrToggleSort("id")}>
							ID{" "}
							{sortBy === "id" && (sortDirection === "ascending" ? "⬇️" : "⬆️")}
						</button>
					</th>
					<th>
						<button
							type="button"
							onClick={() => setOrToggleSort("displayName")}
						>
							Display Name{" "}
							{sortBy === "displayName" &&
								(sortDirection === "ascending" ? "⬇️" : "⬆️")}
						</button>
					</th>
					<th>
						<button
							type="button"
							onClick={() => setOrToggleSort("description")}
						>
							Description{" "}
							{sortBy === "description" &&
								(sortDirection === "ascending" ? "⬇️" : "⬆️")}
						</button>
					</th>
					<th>Roles</th>
				</tr>
			</thead>
			<tbody>
				{groups.map((group) => (
					<tr key={group.id}>
						<td>{group.id}</td>
						<td>{group.displayName}</td>
						<td>{group.description}</td>
						<td>{group.roles.join(", ")}</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}
