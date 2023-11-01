import { User } from "../users"

import { UsersTableRow } from "./UsersTableRow"

export interface UsersTableProps {
	users: User[]
}

export const UsersTable = ({ users }: UsersTableProps) => {
	return (
		<table>
			<thead>
				<tr>
					<th>Id</th>
					<th>User Name</th>
					<th>First Name</th>
					<th>Last Name</th>
					<th>Email</th>
				</tr>
			</thead>
			<tbody>
				{users.map((user) => (
					<UsersTableRow key={user.id} user={user} />
				))}
			</tbody>
		</table>
	)
}
