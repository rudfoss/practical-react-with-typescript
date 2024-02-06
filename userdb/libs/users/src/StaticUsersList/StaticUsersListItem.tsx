import styled from "@emotion/styled"

import { StaticUser } from "../staticUsers"

export interface StaticUsersListItemProps {
	user: StaticUser
	isHighlighted?: boolean

	canDelete?: boolean

	onDelete: () => unknown
}

type HighlightableRowProps = Pick<StaticUsersListItemProps, "isHighlighted">
const HighlightableRow = styled.tr<HighlightableRowProps>`
	td {
		border: 0px solid hotpink;
		padding: ${({ isHighlighted }) => (isHighlighted ? "0px" : "1px")};
		border-width: ${({ isHighlighted }) => (isHighlighted ? "1px" : "0px")};
	}
`

export const StaticUsersListItem = ({
	user,
	isHighlighted,
	canDelete,
	onDelete
}: StaticUsersListItemProps) => {
	return (
		<HighlightableRow isHighlighted={isHighlighted}>
			<td>{user.id}</td>
			<td>{user.username}</td>
			<td>{user.displayName}</td>
			<td>
				<button onClick={() => onDelete()} disabled={!canDelete}>
					❌
				</button>
			</td>
		</HighlightableRow>
	)
}
