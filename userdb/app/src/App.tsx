import React from "react"

export const App = () => {
	return (
		<div>
			<h1 aria-label="Hey there!">Hello world 👋</h1>
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
