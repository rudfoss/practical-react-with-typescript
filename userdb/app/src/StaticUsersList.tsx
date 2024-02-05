import { useState } from "react"

import { StaticUsersListItem } from "./StaticUsersListItem"
import { StaticUser, staticUsers } from "./staticUsers"

export const StaticUsersList = () => {
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
						onDelete={() => onDelete(user)}
						canDelete={users.length > 1}
					/>
				))}
			</tbody>
		</table>
	)
}
