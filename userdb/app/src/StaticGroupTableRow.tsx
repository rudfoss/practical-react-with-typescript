import { StaticGroup } from "./staticGroups"

export interface StaticGroupTableRowProps {
	group: StaticGroup

	canMoveUp?: boolean
	canMoveDown?: boolean
	canDelete?: boolean

	moveGroup: (direction: "up" | "down", group: StaticGroup) => unknown
	deleteGroup: (group: StaticGroup) => unknown
}

export const StaticGroupTableRow = ({
	group,
	canMoveUp = true,
	canMoveDown = true,
	canDelete = true,
	moveGroup,
	deleteGroup
}: StaticGroupTableRowProps) => (
	<tr key={group.id}>
		<td>{group.id}</td>
		<td>{group.displayName}</td>
		<td>
			<button disabled={!canMoveUp} onClick={() => moveGroup("up", group)}>
				⬆️
			</button>
			<button disabled={!canMoveDown} onClick={() => moveGroup("down", group)}>
				⬇️
			</button>
			<button disabled={!canDelete} onClick={() => deleteGroup(group)}>
				❌
			</button>
		</td>
	</tr>
)
