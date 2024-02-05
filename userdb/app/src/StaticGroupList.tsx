import { useState } from "react"

import { arrayMove } from "@react-workshop/utils"

import { StaticGroupListItem } from "./StaticGroupListItem"
import { StaticGroup, staticGroups } from "./staticGroups"

export const StaticGroupList = () => {
	const [groups, setGroups] = useState(staticGroups)

	const onMove = (group: StaticGroup) => (direction: "up" | "down") => {
		const itemIndex = groups.indexOf(group)
		const newIndex = direction === "up" ? itemIndex - 1 : itemIndex + 1
		const movedGroups = arrayMove(groups, itemIndex, newIndex)
		setGroups(movedGroups)
	}

	const onDelete = (group: StaticGroup) => {
		setGroups(groups.filter((existingGroup) => existingGroup !== group))
	}

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
					<th>Display Name</th>
					<th>Controls</th>
				</tr>
			</thead>
			<tbody>
				{groups.map((group, index, array) => (
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
