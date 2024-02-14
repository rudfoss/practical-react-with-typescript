import { Link } from "react-router-dom"

import { User } from "@react-workshop/userdb-api-clients"

export interface UsersTableRowProps {
	user: User
	userLink?: string
	canDelete?: boolean
	onDelete?: () => unknown
}

export const UsersTableRow = ({ user, userLink, canDelete, onDelete }: UsersTableRowProps) => (
	<tr>
		<td>{userLink ? <Link to={userLink}>{user.id}</Link> : user.id}</td>
		<td>{user.username}</td>
		<td>{user.displayName}</td>
		<td>
			{onDelete && (
				<button onClick={() => onDelete()} disabled={!canDelete}>
					❌
				</button>
			)}
		</td>
	</tr>
)
