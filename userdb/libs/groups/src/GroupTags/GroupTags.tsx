import styled from "@emotion/styled"
import { useQueries } from "@tanstack/react-query"

import { LoadingSpinner } from "@react-workshop/ui"

import { useGroupsDataService } from "../groupsDataService"

import { GroupTag } from "./GroupTag"

const Container = styled.ul`
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	margin: 0;
	padding: 0;
	list-style: none;
`

export interface GroupTagsProps {
	groupIds: string[]
	/**
	 * If provided will show an ❌ next to each tag that can be clicked to remove the item.
	 * @param groupId
	 * @returns
	 */
	onRemove?: (groupId: string) => unknown
}

export const GroupTags = ({ groupIds, onRemove }: GroupTagsProps) => {
	const { queries } = useGroupsDataService()
	const groupResults = useQueries({
		queries: groupIds.map((groupId) => queries.byId(groupId))
	})

	if (groupResults) {
		return (
			<Container>
				{groupResults.map((groupResult, index) => (
					<li key={groupIds[index]}>
						<GroupTag groupId={groupIds[index]} groupResult={groupResult} onRemove={onRemove} />
					</li>
				))}
			</Container>
		)
	}

	return <LoadingSpinner />
}
