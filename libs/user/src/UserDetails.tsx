import { useEffect, useState } from "react"

import { TextField } from "@prwt/fields"

import { User } from "./staticUsers"

export interface UserDetailsProps {
	user: Readonly<User>
	onSave?: (newUser: User) => unknown
}

export const UserDetails = ({ user, onSave }: UserDetailsProps) => {
	const [firstName, setFirstName] = useState(user.firstName)
	const [lastName, setLastName] = useState(user.lastName)

	useEffect(() => {
		setFirstName(user.firstName)
		setLastName(user.lastName)
	}, [user])

	const saveUser = () => {
		onSave?.({
			...user,
			firstName,
			lastName
		})
	}

	return (
		<>
			<dl>
				<dt>User name</dt>
				<dd>{user.userName}</dd>
				<dt>Id</dt>
				<dd>{user.id}</dd>
				<dt>First name</dt>
				<dd>
					<TextField
						label="First name"
						value={firstName}
						onChange={setFirstName}
					/>
				</dd>
				<dt>Last name</dt>
				<dd>
					<TextField
						label="Last name"
						value={lastName}
						onChange={setLastName}
					/>
				</dd>
			</dl>
			<button onClick={saveUser}>Save</button>
		</>
	)
}
