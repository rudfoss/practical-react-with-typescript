import { useMemo, useState } from "react"
import { Group } from "./staticGroups"

export interface GroupsTableProps {
	groups: Group[]
}

export const GroupsTable = ({ groups }: GroupsTableProps) => {
	const [sortBy, setSortBy] = useState<keyof Group>()

	const sortedGroups = useMemo(() => {
		const sortedGroups = [...groups]
		switch (sortBy) {
			case "id":
				sortedGroups.sort((a, b) => a.id.localeCompare(b.id))
				break
			case "displayName":
				sortedGroups.sort((a, b) => a.displayName.localeCompare(b.displayName))
				break
		}
		return sortedGroups
	}, [groups, sortBy])

	return (
		<table>
			<thead>
				<tr>
					<th>
						<button type="button" onClick={() => setSortBy("id")}>
							Id
						</button>
					</th>
					<th>
						<button type="button" onClick={() => setSortBy("displayName")}>
							Display name
						</button>
					</th>
				</tr>
			</thead>
			<tbody data-testid="tableBody">
				{sortedGroups.map((group) => (
					<tr key={group.id}>
						<td>{group.id}</td>
						<td>{group.displayName}</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}
