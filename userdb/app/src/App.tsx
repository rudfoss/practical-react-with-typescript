import { useState } from "react"
import { Header } from "./Header"
import { TextField } from "./TextField"
import { UsersTable } from "./UsersTable"
import { staticUsers } from "./staticUsers"

export const App = () => {
	const [header, setHeader] = useState("")
	const [users, setUsers] = useState(staticUsers)

	const onDelete = (userId: string) => {
		setUsers((oldUsers) => {
			return oldUsers.filter((user) => user.id !== userId)
		})
	}

	return (
		<>
			<Header>{header}</Header>
			<TextField label="Header" value={header} onChange={setHeader} />
			<UsersTable users={users} onDelete={onDelete} />
		</>
	)
}
