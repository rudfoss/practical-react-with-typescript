import { useState } from "react"

import { TextField } from "../TextField"

import { User } from "./usersStatic"

export interface UsersTableRowProps {
	user: User
}

export const UsersTableRow = ({ user }: UsersTableRowProps) => {
	const { userName, firstName: initialFirstName, lastName, email } = user
	const [firstName, setFirstName] = useState(initialFirstName)

	return (
		<tr>
			<td>{userName}</td>
			<td>
				<TextField label="First name" value={firstName} onChange={setFirstName} />
			</td>
			<td>{lastName}</td>
			<td>{email}</td>
		</tr>
	)
}
