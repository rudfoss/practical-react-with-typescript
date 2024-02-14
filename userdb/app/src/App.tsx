import React from "react"

import { StaticGroupList } from "./StaticGroupList"

export const App = () => {
	return <StaticGroupList />
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
