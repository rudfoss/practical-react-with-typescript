import { User } from "@prt/data"
import { TextField } from "@prt/fields"

export interface UsersTableRowProps {
	user: User
	setUser: (newUser: User) => unknown
}

export const UsersTableRow = ({ user, setUser }: UsersTableRowProps) => {
	const { userName, firstName, lastName, email } = user

	const setProperty = (propName: keyof User) => (newProperty: unknown) => {
		setUser({
			...user,
			[propName]: newProperty
		})
	}

	return (
		<tr>
			<td>{userName}</td>
			<td>
				<TextField label="First name" value={firstName} onChange={setProperty("firstName")} />
			</td>
			<td>
				<TextField label="Last name" value={lastName} onChange={setProperty("lastName")} />
			</td>
			<td>{email}</td>
		</tr>
	)
}
