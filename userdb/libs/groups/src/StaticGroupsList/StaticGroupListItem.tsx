import { StaticGroup } from "../staticGroups"

export interface StaticGroupListItemProps {
	group: StaticGroup

	canMoveUp?: boolean
	canMoveDown?: boolean
	canDelete?: boolean

	onMove: (direction: "up" | "down") => unknown
	onDelete: () => unknown
}

export const StaticGroupListItem = ({
	group,
	canMoveUp,
	canMoveDown,
	canDelete,
	onMove,
	onDelete
}: StaticGroupListItemProps) => {
	return (
		<tr>
			<td>{group.id}</td>
			<td>{group.displayName}</td>
			<td>
				<button disabled={!canMoveUp} onClick={() => onMove("up")}>
					⬆️
				</button>
				<button disabled={!canMoveDown} onClick={() => onMove("down")}>
					⬇️
				</button>
				<button disabled={!canDelete} onClick={() => onDelete()}>
					❌
				</button>
			</td>
		</tr>
	)
}
