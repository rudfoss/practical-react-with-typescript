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
			<td>{userName}</td>
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
