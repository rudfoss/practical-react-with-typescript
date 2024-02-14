import { useState } from "react"

import { arrayMove } from "@react-workshop/utils"

import { StaticGroupTableRow } from "./StaticGroupTableRow"
import { StaticGroup, staticGroups } from "./staticGroups"

export const StaticGroupTable = () => {
	const [groups, setGroups] = useState(staticGroups)

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

	return (
		<table>
			<thead>
				<tr>
					<th>Id</th>
					<th>Display name</th>
					<th>Controls</th>
				</tr>
			</thead>
			<tbody>
				{groups.map((group, index, groupList) => (
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
