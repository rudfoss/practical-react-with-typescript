import styled from "@emotion/styled"

import { IUserDTO } from "@prt/clients"
import { TextField } from "@prt/fields"

const TD = styled.td`
	border: 1px solid #000;
`

export interface UserTableRowProps {
	user: IUserDTO
	setUser: (user: IUserDTO) => unknown
}

export const UserTableRow = ({ user, setUser }: UserTableRowProps) => {
	const { userName, firstName, lastName, email } = user
	const setFirstName = (newFirstName: string) => {
		setUser({
			...user,
			firstName: newFirstName
		})
	}

	return (
		<tr>
			<TD>{userName}</TD>
			<TD>
				<TextField label="First Name" value={firstName ?? ""} onChange={setFirstName} />
			</TD>
			<TD>{firstName}</TD>
			<TD>{lastName}</TD>
			<TD>{email}</TD>
		</tr>
	)
}
