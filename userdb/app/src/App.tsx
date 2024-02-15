import React from "react"

import { Header } from "@react-workshop/ui"
import { LoginForm } from "@react-workshop/userdb-libs-auth"
import { StaticGroupTable } from "@react-workshop/userdb-libs-groups"

const onLogin = (username: string, password: string) => {
	console.log({ username, password })
}

export const App = () => (
	<>
		<Header>Hello world</Header>
		<LoginForm onLogin={onLogin} />
		<StaticGroupTable />
	</>
)

export const AppWithoutJsx = () =>
	React.createElement("div", {}, [
		React.createElement("hr"),
		React.createElement("h1", {
			"aria-label": "Hello there!",
			children: "Hello world 👋"
		}),
		React.createElement("hr")
	])
