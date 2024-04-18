import { StaticGroup } from "./staticGroups"

export interface StaticGroupTableRowProps {
	group: StaticGroup
	highlighted?: boolean

	onMoveUp?: () => unknown
	onMoveDown?: () => unknown
	onDelete: () => unknown
}

export const StaticGroupTableRow = ({
	group,
	highlighted,
	onMoveUp,
	onMoveDown,
	onDelete
}: StaticGroupTableRowProps) => (
	<tr key={group.id}>
		<td style={{ fontWeight: highlighted ? "bold" : "" }}>{group.id}</td>
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
