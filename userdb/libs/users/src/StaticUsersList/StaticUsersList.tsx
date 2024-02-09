import { useState } from "react"

import { StaticUser, staticUsers } from "../staticUsers"

import { StaticUsersListItem } from "./StaticUsersListItem"

export interface StaticUsersListProps {
	/**
	 * If specified this user id will be highlighted if it exists.
	 */
	highlightUserId?: string
}

export const StaticUsersList = ({ highlightUserId }: StaticUsersListProps) => {
	const [users, setUsers] = useState(staticUsers)

	const onDelete = (user: StaticUser) => {
		setUsers(users.filter((existingUser) => existingUser !== user))
	}

	return (
		<table>
			<thead>
				<tr>
					<th>Id</th>
					<th>User name</th>
					<th>Display Name</th>
					<th>Controls</th>
				</tr>
			</thead>
			<tbody>
				{users.map((user) => (
					<StaticUsersListItem
						key={user.id}
						user={user}
						isHighlighted={highlightUserId === user.id}
						onDelete={() => onDelete(user)}
						canDelete={users.length > 1}
					/>
				))}
			</tbody>
		</table>
	)
}
