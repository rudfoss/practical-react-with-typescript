import React, { useState } from "react"

import { CheckboxField } from "./CheckboxField"
import { Header } from "./Header"
import { PasswordField } from "./PasswordField"
import { TextField } from "./TextField"

export const App = () => {
	const [value, setValue] = useState("")
	const [checked, setIsChecked] = useState(false)

	return (
		<div>
			<Header>{value}</Header>
			<hr />
			<TextField label="Header text" value={value} onChange={setValue} />
			<PasswordField label="Password" value={value} onChange={setValue} />
			<CheckboxField label="Checkbox" value={checked} onChange={setIsChecked} />
		</div>
	)
}

export const AppWithoutJsx = () => {
	return React.createElement("div", {}, [
		React.createElement("hr"),
		React.createElement("h1", {
			"aria-label": "Hello there!",
			children: "Hello world 👋"
		}),
		React.createElement("hr")
	])
}
