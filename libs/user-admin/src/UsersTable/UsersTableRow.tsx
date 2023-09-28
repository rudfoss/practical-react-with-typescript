import { Link } from "react-router-dom"

import { User } from "../users"

export interface UsersTableRowProps {
	user: User
}

export const UsersTableRow = ({ user }: UsersTableRowProps) => {
	const { id, userName, firstName, lastName, email } = user
	return (
		<tr>
			<td>
				<Link to={`/users/${id}`}>{id}</Link>
			</td>
			<td>{userName}</td>
			<td>{firstName}</td>
			<td>{lastName}</td>
			<td>{email}</td>
		</tr>
	)
}
