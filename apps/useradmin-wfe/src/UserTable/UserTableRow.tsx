import styled from "@emotion/styled"
import { useState } from "react"

import { StaticUser } from "@prt/data"
import { TextField } from "@prt/fields"

const TD = styled.td`
	border: 1px solid #000;
`

export interface UserTableRowProps {
	user: StaticUser
}

export const UserTableRow = ({ user }: UserTableRowProps) => {
	const { userName: initialUserName, firstName, lastName, email, age } = user
	const [userName, setUserName] = useState(initialUserName)
	return (
		<tr>
			<TD>
				<TextField label="User name" value={userName} onChange={setUserName} />
			</TD>
			<TD>{firstName}</TD>
			<TD>{lastName}</TD>
			<TD>{email}</TD>
		</tr>
	)
}
