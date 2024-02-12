import styled from "@emotion/styled"
import { UseQueryResult } from "@tanstack/react-query"
import { Link } from "react-router-dom"

import { LoadingSpinner } from "@react-workshop/ui"
import { Group } from "@react-workshop/userdb-api-client"

const Tag = styled.div`
	display: inline-flex;
	border: 1px solid #afafaf;
	border-radius: 8px;
	padding: 4px 6px;
`

export interface GroupTagProps {
	groupId: string
	groupResult: UseQueryResult<Group>
}

export const GroupTag = ({ groupId, groupResult }: GroupTagProps) => {
	const { data: group, isError } = groupResult

	if (group) {
		return (
			<Tag>
				<Link to={`/groups/${groupId}`}>{group.displayName}</Link>
			</Tag>
		)
	}
	if (isError) {
		return (
			<Tag>
				<Link to={`/groups/${groupId}`}>💥 {groupId}</Link>
			</Tag>
		)
	}

	return (
		<Tag>
			<LoadingSpinner size={16} />
		</Tag>
	)
}
