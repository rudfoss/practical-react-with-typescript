import { useState } from "react"
import { Header } from "./Header"
import { TextField } from "./TextField"

export const App = () => {
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")

	const clear = () => {
		setFirstName("")
		setLastName("")
	}

	return (
		<>
			<Header>
				Hello <code>from</code> app
			</Header>
			<TextField label="First name" value={firstName} onChange={setFirstName} />
			<TextField label="Last name" value={lastName} onChange={setLastName} />
			<button type="button" onClick={clear}>
				Clear
			</button>
			<p>
				Hei {firstName} {lastName}
			</p>
		</>
	)
}
