import { Group } from "./staticGroups"

export interface ListDataItemProps {
	group: Group
	isHighlighted?: boolean
	onSelect: (group: Group) => unknown
}

export const ListDataItem = ({ group, isHighlighted, onSelect }: ListDataItemProps) => {
	const onItemClick = () => {
		onSelect(group)
	}

	return (
		<div
			onClick={onItemClick}
			style={{
				fontWeight: isHighlighted ? "bold" : undefined
			}}
		>
			{group.name} - {group.id}
		</div>
	)
}
