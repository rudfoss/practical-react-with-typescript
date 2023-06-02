import { useMemo, useState } from "react"

import { Group } from "../staticGroups"

type SortDirection = "asc" | "desc"

export interface GroupsListProps {
	groups: Group[]
	setGroups: (newGroups: Group[]) => unknown
	detailsLinkRenderer: (groupId: string, text: string) => React.ReactNode
}

export const GroupsList = ({
	groups,
	setGroups,
	detailsLinkRenderer
}: GroupsListProps) => {
	const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
	const [selectedGroupId, setSelectedGroupId] = useState<string>()

	const sortedGroups = useMemo(() => {
		return [...groups].sort((a, b) => {
			const reversed = sortDirection === "asc" ? 1 : -1
			return a.name.localeCompare(b.name) * reversed
		})
	}, [groups, sortDirection])

	const selectedGroup = useMemo(() => {
		if (!selectedGroupId) return undefined
		const selectedGroupIndex = sortedGroups.findIndex(
			(item) => item.id === selectedGroupId
		)
		if (selectedGroupIndex < 0) return undefined
		const selectedGroupName = sortedGroups[selectedGroupIndex].name

		return {
			selectedGroupIndex,
			selectedGroupName
		}
	}, [sortedGroups, selectedGroupId])

	const toggleSortDirection = () => {
		setSortDirection(sortDirection === "asc" ? "desc" : "asc")
	}
	const deleteGroupById = (idToDelete: string) => () => {
		const filteredGroups = groups.filter((item) => item.id !== idToDelete)
		setGroups(filteredGroups)
	}
	const selectGroup = (id: string) => () => {
		setSelectedGroupId(id)
	}

	return (
		<>
			<button onClick={toggleSortDirection}>Sort {sortDirection}</button>
			{selectedGroup && (
				<p>
					You selected {selectedGroup.selectedGroupName} at{" "}
					{selectedGroup.selectedGroupIndex} - {selectedGroupId}
				</p>
			)}
			<ol>
				{sortedGroups.map((item) => (
					<li key={item.id}>
						{detailsLinkRenderer(item.id, item.name)}
						<button onClick={selectGroup(item.id)}>{item.id}</button>
						<button onClick={deleteGroupById(item.id)}>Delete</button>
					</li>
				))}
			</ol>
		</>
	)
}