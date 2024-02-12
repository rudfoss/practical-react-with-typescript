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
}

export const GroupTags = ({ groupIds }: GroupTagsProps) => {
	const { queries } = useGroupsDataService()
	const groupResults = useQueries({
		queries: groupIds.map((groupId) => queries.byId(groupId))
	})

	if (groupResults) {
		return (
			<Container>
				{groupResults.map((groupResult, index) => (
					<li key={groupIds[index]}>
						<GroupTag groupId={groupIds[index]} groupResult={groupResult} />
					</li>
				))}
			</Container>
		)
	}

	return <LoadingSpinner />
}
