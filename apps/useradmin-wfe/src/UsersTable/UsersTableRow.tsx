import { Link } from "react-router-dom"

import { UserDTO, useDeleteUser } from "@prt/data"
import { ConfirmDeleteButton } from "@prt/fields"

export interface UsersTableRowProps {
	user: UserDTO
}

export const UsersTableRow = ({ user }: UsersTableRowProps) => {
	const { id, userName, firstName, lastName, email } = user
	const { mutate: deleteUserById, isLoading } = useDeleteUser()

	const deleteUser = () => {
		deleteUserById(id)
	}

	return (
		<tr>
			<td>
				<Link to={`/users/${id}`}>{userName}</Link>
			</td>
			<td>{firstName}</td>
			<td>{lastName}</td>
			<td>{email}</td>
			<td>
				<ConfirmDeleteButton disabled={isLoading} onClick={deleteUser}>
					Delete
				</ConfirmDeleteButton>
			</td>
		</tr>
	)
}
