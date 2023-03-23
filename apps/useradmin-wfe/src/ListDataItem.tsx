import { Group } from "./staticGroups"

export interface ListDataItemProps {
	group: Group
	isHighlighted?: boolean
	onSelect: (group: Group) => unknown
	onDelete: (group: Group) => unknown
}

export const ListDataItem = ({ group, isHighlighted, onSelect, onDelete }: ListDataItemProps) => {
	const onItemClick = () => {
		onSelect(group)
	}
	const onDeleteClick = () => {
		onDelete(group)
	}

	return (
		<div
			onClick={onItemClick}
			style={{
				fontWeight: isHighlighted ? "bold" : undefined
			}}
		>
			{group.name} - {group.id}
			<button onClick={onDeleteClick}>Delete</button>
		</div>
	)
}
