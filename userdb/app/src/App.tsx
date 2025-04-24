import { useState } from "react"
import { GroupsTable } from "./GroupsTable"
import { Header } from "./Header"
import { TextField } from "./TextField"
import { staticGroups } from "./staticGroups"

export const App = () => {
	const [header, setHeader] = useState("")

	return (
		<>
			<Header>{header}</Header>
			<TextField label="Header" value={header} onChange={setHeader} />
			<GroupsTable groups={staticGroups} />
		</>
	)
}
