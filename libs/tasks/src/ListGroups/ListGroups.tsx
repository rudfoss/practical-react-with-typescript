import styled from "@emotion/styled"
import { useMemo, useState } from "react"

import { slowDown } from "@prwt/utils"

import { Group } from "./groups"

interface ButtonProps {
	isSelected: boolean
}
const Button = styled.button<ButtonProps>`
	background-color: transparent;
	border: 0;
	padding: 0;
	margin: 0;
	cursor: pointer;
	font-weight: ${(props) => (props.isSelected ? "bold" : "normal")};
`

type SortDirection = "asc" | "desc"

export interface ListGroupsProps {
	groups: Group[]
	onChange: (newGroups: Group[]) => unknown
}

export const ListGroups = ({ groups, onChange }: ListGroupsProps) => {
	const [selectedGroup, setSelectedGroup] = useState<Group>()
	const [sortDirection, setSortDirection] = useState<SortDirection>("asc")

	const sortedGroups = useMemo(() => {
		slowDown(40) // Simulate slow sorting
		const sortedGroups = [...groups]
		sortedGroups.sort((groupA, groupB) => {
			const flipSortOrder = sortDirection === "asc" ? 1 : -1
			return groupA.name.localeCompare(groupB.name) * flipSortOrder
		})
		return sortedGroups
	}, [groups, sortDirection])

	const selectGroup = (group: Group) => () => {
		setSelectedGroup(group)
	}
	const isSelected = (group: Group, otherGroup?: Group) =>
		Object.is(group, otherGroup)

	const deleteGroup = (groupToDelete: Group) => () => {
		if (selectedGroup?.id === groupToDelete.id) {
			setSelectedGroup(undefined)
		}
		onChange(groups.filter((group) => group.id !== groupToDelete.id))
	}

	const toggleSortDirection = () => {
		if (sortDirection === "asc") {
			setSortDirection("desc")
			return
		}
		setSortDirection("asc")
	}

	return (
		<>
			<button onClick={toggleSortDirection}>
				Sort direction: {sortDirection === "asc" ? "ascending" : "descending"}
			</button>
			{selectedGroup && (
				<div>
					Selected group: <strong>{selectedGroup.name}</strong>
				</div>
			)}
			<ol>
				{sortedGroups.map((group) => (
					<li key={group.id}>
						<Button
							isSelected={isSelected(group, selectedGroup)}
							onClick={selectGroup(group)}
						>
							{group.name}
						</Button>
						<button onClick={deleteGroup(group)}>Remove group</button>
					</li>
				))}
			</ol>
		</>
	)
}
