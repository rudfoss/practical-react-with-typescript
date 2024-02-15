import React from "react"

import { Header } from "@react-workshop/ui"

export const App = () => <Header>Hello world</Header>

export const AppWithoutJsx = () =>
	React.createElement("div", {}, [
		React.createElement("hr"),
		React.createElement("h1", {
			"aria-label": "Hello there!",
			children: "Hello world 👋"
		}),
		React.createElement("hr")
	])
