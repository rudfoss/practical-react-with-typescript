import { useState } from "react"

import { ListDataItem } from "./ListDataItem"
import { Group } from "./staticGroups"

export interface ListDataProps {
	groups: Group[]
}

export const ListData = ({ groups }: ListDataProps) => {
	const [selectedGroup, setSelectedGroup] = useState<Group>()

	const selectGroup = (group: Group) => {
		setSelectedGroup(group)
	}

	return (
		<>
			{selectedGroup && (
				<dl>
					<dt>Id</dt>
					<dd>{selectedGroup.id}</dd>

					<dt>Name</dt>
					<dd>{selectedGroup.name}</dd>

					<dt>Role</dt>
					<dd>{selectedGroup.role}</dd>

					<dt>Description</dt>
					<dd>{selectedGroup.description}</dd>
				</dl>
			)}
			<ol>
				{groups.map((group) => (
					<li key={group.id}>
						<ListDataItem
							group={group}
							onSelect={selectGroup}
							isHighlighted={group === selectedGroup}
						/>
					</li>
				))}
			</ol>
		</>
	)
}
