import { useMemo, useState } from "react"

import { arrayMove } from "@react-workshop/utils"

import { StaticGroup, staticGroups } from "../data"

import { StaticGroupTableRow } from "./StaticGroupTableRow"

type SortDirection = "ascending" | "descending"

export const StaticGroupTable = () => {
	const [groups, setGroups] = useState(staticGroups)
	const [sortDirection, setSortDirection] = useState<SortDirection>()

	const sortedGroups = useMemo(() => {
		if (!sortDirection) return groups

		const groupsToSort = [...groups]
		groupsToSort.sort((a, b) => {
			const comparisonResult = a.displayName.localeCompare(b.displayName)
			return sortDirection === "ascending" ? comparisonResult : comparisonResult * -1
		})
		return groupsToSort
	}, [groups, sortDirection])

	const moveGroup = (direction: "up" | "down", group: StaticGroup) => {
		const groupIndex = groups.indexOf(group)
		const newIndex = direction === "up" ? groupIndex - 1 : groupIndex + 1
		const newGroups = arrayMove(groups, groupIndex, newIndex)
		setGroups(newGroups)
	}

	const deleteGroup = (group: StaticGroup) => {
		const newGroups = groups.filter((aGroup) => aGroup !== group)
		setGroups(newGroups)
	}

	const toggleSortDirection = () => {
		if (!sortDirection) {
			setSortDirection("ascending")
			return
		}

		setSortDirection(sortDirection === "ascending" ? "descending" : "ascending")
	}

	return (
		<table>
			<thead>
				<tr>
					<th>Id</th>
					<th>
						<button onClick={toggleSortDirection}>
							Display name
							{sortDirection === "ascending" && "⬇️"}
							{sortDirection === "descending" && "⬆️"}
						</button>
					</th>
					<th>Controls</th>
				</tr>
			</thead>
			<tbody>
				{sortedGroups.map((group, index, groupList) => (
					<StaticGroupTableRow
						key={group.id}
						group={group}
						canMoveUp={index > 0}
						canMoveDown={index < groupList.length - 1}
						canDelete={groupList.length > 1}
						deleteGroup={deleteGroup}
						moveGroup={moveGroup}
					/>
				))}
			</tbody>
		</table>
	)
}
