import React, { useState } from "react"

import { Header } from "./Header"
import { TextField } from "./TextField"

export const App = () => {
	const [value, setValue] = useState("")

	return (
		<div>
			<Header>{value}</Header>
			<hr />
			<TextField label="Header text" value={value} onChange={setValue} />
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
