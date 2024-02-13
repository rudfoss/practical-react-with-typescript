import styled from "@emotion/styled"
import { UseQueryResult } from "@tanstack/react-query"
import { Link } from "react-router-dom"

import { LoadingSpinner } from "@react-workshop/ui"
import { Group } from "@react-workshop/userdb-api-clients"

const Tag = styled.div`
	display: inline-flex;
	border: 1px solid #afafaf;
	border-radius: 8px;
	padding: 4px 6px;
`

export interface GroupTagProps {
	groupId: string
	groupResult: UseQueryResult<Group>
	/**
	 * If provided will show an ❌ next to each tag that can be clicked to remove the item.
	 * @param groupId
	 * @returns
	 */
	onRemove?: (groupId: string) => unknown
}

export const GroupTag = ({ groupId, groupResult, onRemove }: GroupTagProps) => {
	const { data: group, isError } = groupResult

	const removeItem = onRemove ? <button onClick={() => onRemove(groupId)}>❌</button> : undefined

	if (group) {
		return (
			<Tag>
				<Link to={`/groups/${groupId}`}>{group.displayName}</Link>
				{removeItem}
			</Tag>
		)
	}
	if (isError) {
		return (
			<Tag>
				<Link to={`/groups/${groupId}`}>💥 {groupId}</Link>
				{removeItem}
			</Tag>
		)
	}

	return (
		<Tag>
			<LoadingSpinner size={16} />
		</Tag>
	)
}
