import { useState } from "react"

import { CheckboxField } from "./CheckboxField"
import { Header } from "./Header"
import { TextField } from "./TextField"

export const App = () => {
	const [heading, setHeading] = useState("Hello world!")
	const [password, setPassword] = useState("")
	const [isAdmin, setIsAdmin] = useState(false)

	return (
		<>
			<Header>{heading}</Header>
			<TextField value={heading} onChange={setHeading} label="Header text" />
			<TextField value={password} onChange={setPassword} label="Password" type="password" />
			<CheckboxField value={isAdmin} onChange={setIsAdmin} label="User is administrator" />
		</>
	)
}
