import { Link } from "react-router-dom"

import { StaticGroup } from "../data"

export interface StaticGroupTableRowProps {
	group: StaticGroup
	isHighlighted?: boolean

	canMoveUp?: boolean
	canMoveDown?: boolean
	canDelete?: boolean

	moveGroup: (direction: "up" | "down", group: StaticGroup) => unknown
	deleteGroup: (group: StaticGroup) => unknown
}

export const StaticGroupTableRow = ({
	group,
	isHighlighted,
	canMoveUp = true,
	canMoveDown = true,
	canDelete = true,
	moveGroup,
	deleteGroup
}: StaticGroupTableRowProps) => (
	<tr key={group.id}>
		<td style={{ border: isHighlighted ? "1px solid hotpink" : "" }}>
			<Link to={`/groups/${group.id}`}>{group.id}</Link>
		</td>
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
