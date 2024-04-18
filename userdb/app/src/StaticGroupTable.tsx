import { arrayMove } from "@react-workshop/utils"

import { StaticGroupTableRow } from "./StaticGroupTableRow"
import { StaticGroup } from "./staticGroups"

export interface StaticGroupTableProps {
	groups: StaticGroup[]
	highlightGroupId?: string
	setGroups: (newGroups: StaticGroup[]) => unknown
}

export const StaticGroupTable = ({
	groups,
	highlightGroupId,
	setGroups
}: StaticGroupTableProps) => {
	const moveItemUp = (groupIndex: number) => {
		setGroups(arrayMove(groups, groupIndex, groupIndex - 1))
	}
	const moveItemDown = (groupIndex: number) => {
		setGroups(arrayMove(groups, groupIndex, groupIndex + 1))
	}
	const deleteItem = (groupIndex: number) => {
		const newGroups = [...groups]
		newGroups.splice(groupIndex, 1)
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
				{groups.map((group, index, array) => (
					<StaticGroupTableRow
						key={group.id}
						group={group}
						highlighted={group.id === highlightGroupId}
						onDelete={() => deleteItem(index)}
						onMoveUp={index === 0 ? undefined : () => moveItemUp(index)}
						onMoveDown={index === array.length - 1 ? undefined : () => moveItemDown(index)}
					/>
				))}
			</tbody>
		</table>
	)
}
