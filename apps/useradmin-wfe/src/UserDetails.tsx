import { User } from "./staticUser"

export interface UserDetailsProps {
	user: Readonly<User>
	onSave: (newUser: User) => unknown
}

export const UserDetails = ({ user, onSave }: UserDetailsProps) => {
	const clearFirstName = () => {
		onSave({
			...user,
			firstName: ""
		})
	}

	return (
		<dl>
			<dt>User name</dt>
			<dd>{user.userName}</dd>
			<dt>Id</dt>
			<dd>{user.id}</dd>
			<dt onClick={clearFirstName}>First name</dt>
			<dd>{user.firstName}</dd>
			<dt>Last name</dt>
			<dd>{user.lastName}</dd>
		</dl>
	)
}
