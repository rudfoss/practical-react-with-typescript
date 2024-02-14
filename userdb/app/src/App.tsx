import React from "react"

import { Header } from "./Header"

export const App = () => {
	return (
		<div>
			<Header>Hello world 👋</Header>
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
