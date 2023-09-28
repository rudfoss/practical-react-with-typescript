import styled from "@emotion/styled"

import { BooleanField, NumericField, TextField } from "@prwt/fields"

import { User } from "./user"

const Container = styled.div`
	padding: 4px;
	border: 1px solid hotpink;
	border-radius: 4px;
`

export interface UserDetailsProps {
	user: User
	onChange: (newUser: User) => unknown
}

export const UserDetails = ({ user, onChange }: UserDetailsProps) => {
	const changePropertyOnUser =
		<T extends keyof User>(propertyName: T) =>
		(newPropertyValue: User[T]) => {
			onChange({
				...user,
				[propertyName]: newPropertyValue
			})
		}

	return (
		<Container>
			<dl>
				<dt>User Name</dt>
				<dd>{user.userName}</dd>
				<dt>Id</dt>
				<dd>{user.id}</dd>
				<dt>First Name</dt>
				<dd>
					<TextField
						label="First Name"
						value={user.firstName}
						onChange={changePropertyOnUser("firstName")}
					/>
				</dd>
				<dt>Last Name</dt>
				<dd>
					<TextField
						label="Last Name"
						value={user.lastName}
						onChange={changePropertyOnUser("lastName")}
					/>
				</dd>
				<dt>Email</dt>
				<dd>{user.email}</dd>
				<dt>Age</dt>
				<dd>
					<NumericField
						label="Age"
						value={user.age}
						min={10}
						max={30}
						onChange={changePropertyOnUser("age")}
					/>
				</dd>
			</dl>
		</Container>
	)
}
