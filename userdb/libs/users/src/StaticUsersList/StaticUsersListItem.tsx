import { StaticUser } from "../staticUsers"

export interface StaticUsersListItemProps {
	user: StaticUser

	canDelete?: boolean

	onDelete: () => unknown
}

export const StaticUsersListItem = ({ user, canDelete, onDelete }: StaticUsersListItemProps) => {
	return (
		<tr>
			<td>{user.id}</td>
			<td>{user.username}</td>
			<td>{user.displayName}</td>
			<td>
				<button onClick={() => onDelete()} disabled={!canDelete}>
					❌
				</button>
			</td>
		</tr>
	)
}
