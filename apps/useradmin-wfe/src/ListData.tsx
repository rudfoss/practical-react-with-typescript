import { useMemo, useState } from "react"

import { ListDataItem } from "./ListDataItem"
import { Group } from "./groupsStatic"

export interface ListDataProps {
	groups: Group[]
}

export const ListData = ({ groups }: ListDataProps) => {
	const [internalGroups, setInternalGroups] = useState(groups)
	const [selectedGroup, setSelectedGroup] = useState<Group>()
	const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

	const sortedGroups = useMemo(() => {
		const groupsToSort = internalGroups.slice(0)
		groupsToSort.sort((a, b) => {
			if (sortDirection === "asc") {
				return a.name.localeCompare(b.name)
			}
			return b.name.localeCompare(a.name)
		})
		return groupsToSort
	}, [internalGroups, sortDirection])

	const selectGroup = (group: Group) => {
		setSelectedGroup(group)
	}
	const toggleSortDirection = () => {
		if (sortDirection === "asc") {
			setSortDirection("desc")
			return
		}
		setSortDirection("asc")
	}
	const deleteGroup = (group: Group) => {
		const newGroupList = internalGroups.filter((aGroup) => group !== aGroup)
		setInternalGroups(newGroupList)
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
			<button onClick={toggleSortDirection}>Sort direction: {sortDirection}</button>
			<ol>
				{sortedGroups.map((group) => (
					<li key={group.id}>
						<ListDataItem
							group={group}
							onSelect={selectGroup}
							isHighlighted={group === selectedGroup}
							onDelete={deleteGroup}
						/>
					</li>
				))}
			</ol>
		</>
	)
}
