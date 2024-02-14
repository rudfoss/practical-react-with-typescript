import React from "react"

import { TextField } from "./TextField"

export const App = () => {
	return (
		<div>
			<TextField label="Header text" />
			<hr />
			<TextField label="Header text" />
			<hr />
			<TextField label="Header text" />
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
