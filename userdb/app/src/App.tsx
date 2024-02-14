import React from "react"

import { StaticGroupTable } from "./StaticGroupTable"

export const App = () => <StaticGroupTable />

export const AppWithoutJsx = () =>
	React.createElement("div", {}, [
		React.createElement("hr"),
		React.createElement("h1", {
			"aria-label": "Hello there!",
			children: "Hello world 👋"
		}),
		React.createElement("hr")
	])
