import { useMemo, useState } from "react"
import { Link } from "react-router-dom"

import { IGroupDTO } from "@prwt/useradmin-wbe-client"

import { useUserNavService } from "../userNavService"

type SortDirection = "asc" | "desc"

export interface GroupsListProps {
	groups: IGroupDTO[]
}

export const GroupsList = ({ groups }: GroupsListProps) => {
	const { createGroupDetailsPath } = useUserNavService()
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
				{sortedGroups.map((group) => (
					<li key={group.id}>
						<Link to={createGroupDetailsPath(group.id)}>View</Link>
						<button onClick={selectGroup(group.id)}>{group.name}</button>
					</li>
				))}
			</ol>
		</>
	)
}
