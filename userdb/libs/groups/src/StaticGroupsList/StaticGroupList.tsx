import { useMemo, useState } from "react"

import { arrayMove } from "@react-workshop/utils"

import { StaticGroup, staticGroups } from "../staticGroups"

import { StaticGroupListItem } from "./StaticGroupListItem"

type SortDirection = "ascending" | "descending"

export const StaticGroupList = () => {
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

	const onMove = (group: StaticGroup) => (direction: "up" | "down") => {
		const itemIndex = groups.indexOf(group)
		const newIndex = direction === "up" ? itemIndex - 1 : itemIndex + 1
		const movedGroups = arrayMove(groups, itemIndex, newIndex)
		setGroups(movedGroups)
	}

	const onDelete = (group: StaticGroup) => {
		setGroups(groups.filter((existingGroup) => existingGroup !== group))
	}

	const toggleSortDirection = () => {
		if (!sortDirection) {
			setSortDirection("ascending")
			return
		}
		if (sortDirection === "ascending") {
			setSortDirection("descending")
			return
		}

		setSortDirection(undefined)
	}

	// Kept for documentation purposes
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const naiveOnDelete = (group: StaticGroup) => {
		const groupId = groups.indexOf(group)
		groups.splice(groupId, 1)
		setGroups(groups)
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
				{sortedGroups.map((group, index, array) => (
					<StaticGroupListItem
						key={group.id}
						group={group}
						onMove={() => onMove(group)}
						onDelete={() => onDelete(group)}
						canMoveUp={index > 0}
						canMoveDown={index < array.length - 1}
						canDelete={!group.isSystemDefined}
					/>
				))}
			</tbody>
		</table>
	)
}
