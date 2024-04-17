import { StaticGroup } from "./staticGroups"

export interface StaticGroupTableRowProps {
	group: StaticGroup

	onMoveUp?: () => unknown
	onMoveDown?: () => unknown
	onDelete: () => unknown
}

export const StaticGroupTableRow = ({
	group,
	onMoveUp,
	onMoveDown,
	onDelete
}: StaticGroupTableRowProps) => (
	<tr key={group.id}>
		<td>{group.id}</td>
		<td>{group.displayName}</td>
		<td>
			<button disabled={!onMoveUp} onClick={() => onMoveUp?.()}>
				⬆️
			</button>
			<button disabled={!onMoveDown} onClick={() => onMoveDown?.()}>
				⬇️
			</button>
			<button onClick={() => onDelete()}>❌</button>
		</td>
	</tr>
)
