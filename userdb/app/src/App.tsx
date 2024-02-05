import { useState } from "react"

import { Header } from "./Header"
import { TextField } from "./TextField"

export const App = () => {
	const [heading, setHeading] = useState("Hello world!")

	return (
		<>
			<Header>{heading}</Header>
			<TextField value={heading} onChange={setHeading} label="Header text" />
		</>
	)
}
