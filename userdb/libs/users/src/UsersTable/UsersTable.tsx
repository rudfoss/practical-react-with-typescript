import { User } from "@react-workshop/userdb-api-client"

import { UsersTableRow } from "./UsersTableRow"

export interface UsersTableProps {
	users: User[]
	createUserLink?: (user: User) => string
	canDelete?: boolean
	onDelete?: (user: User) => unknown
}

export const UsersTable = ({ users, createUserLink, canDelete, onDelete }: UsersTableProps) => {
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
					<UsersTableRow
						key={user.id}
						user={user}
						userLink={createUserLink?.(user)}
						onDelete={onDelete ? () => onDelete(user) : undefined}
						canDelete={canDelete}
					/>
				))}
			</tbody>
		</table>
	)
}
