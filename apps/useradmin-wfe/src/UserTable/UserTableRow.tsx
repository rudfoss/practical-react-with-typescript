import { useState } from "react"

import { StaticUser } from "@prt/data"
import { TextField } from "@prt/fields"

export interface UserTableRowProps {
	user: StaticUser
}

export const UserTableRow = ({ user }: UserTableRowProps) => {
	const { userName: initialUserName, firstName, lastName, email, age } = user
	const [userName, setUserName] = useState(initialUserName)
	return (
		<tr>
			<td>
				<TextField label="User name" value={userName} onChange={setUserName} />
			</td>
			<td>{firstName}</td>
			<td>{lastName}</td>
			<td>{email}</td>
		</tr>
	)
}
