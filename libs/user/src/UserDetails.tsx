import { useState } from "react"

import { NumericField, TextField } from "@prwt/fields"
import { IUserDTO } from "@prwt/useradmin-wbe-client"

export interface UserDetailsProps {
	user: Readonly<IUserDTO>
	onSave?: (newUser: IUserDTO) => unknown
}

export const UserDetails = ({ user, onSave }: UserDetailsProps) => {
	const [firstName, setFirstName] = useState(user.firstName ?? "")
	const [lastName, setLastName] = useState(user.lastName ?? "")
	const [email, setEmail] = useState(user.email ?? "")
	const [age, setAge] = useState(user.age ?? 0)

	const isFirstNameDirty = (user.firstName ?? "") !== firstName

	const saveUser = () => {
		onSave?.({
			...user,
			firstName,
			lastName,
			age,
			email
		})
	}

	return (
		<>
			<dl>
				<dt>User name</dt>
				<dd>{user.userName}</dd>
				<dt>Id</dt>
				<dd>{user.id}</dd>
				<dt>First name {isFirstNameDirty ? "*" : ""}</dt>
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
				<dt>Email</dt>
				<dd>
					<TextField label="Email" value={email} onChange={setEmail} />
				</dd>
				<dt>Age</dt>
				<dd>
					<NumericField
						label="Age"
						value={age}
						onChange={setAge}
						min={0}
						max={120}
					/>
				</dd>
			</dl>
			<button onClick={saveUser}>Save</button>
		</>
	)
}
