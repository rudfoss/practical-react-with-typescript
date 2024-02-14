import React from "react"

import { StaticGroupList } from "./StaticGroupList"

export const App = () => <StaticGroupList />

export const AppWithoutJsx = () =>
	React.createElement("div", {}, [
		React.createElement("hr"),
		React.createElement("h1", {
			"aria-label": "Hello there!",
			children: "Hello world 👋"
		}),
		React.createElement("hr")
	])
