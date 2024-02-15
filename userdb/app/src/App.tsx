import React from "react"

import { FieldsShowcase } from "./FieldsShowcase"

export const App = () => <FieldsShowcase />

export const AppWithoutJsx = () =>
	React.createElement("div", {}, [
		React.createElement("hr"),
		React.createElement("h1", {
			"aria-label": "Hello there!",
			children: "Hello world 👋"
		}),
		React.createElement("hr")
	])
