import React from "react"

import { LoginForm } from "./LoginForm"

const onLogin = (username: string, password: string) => {
	console.log({ username, password })
}

export const App = () => <LoginForm onLogin={onLogin} />

export const AppWithoutJsx = () =>
	React.createElement("div", {}, [
		React.createElement("hr"),
		React.createElement("h1", {
			"aria-label": "Hello there!",
			children: "Hello world 👋"
		}),
		React.createElement("hr")
	])
