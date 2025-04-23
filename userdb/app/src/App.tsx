import { useState } from "react"
import { CheckboxField } from "./CheckboxField"
import { Header } from "./Header"
import { TextField } from "./TextField"

export const App = () => {
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [hideGreeting, setHideGreeting] = useState(false)

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
			<CheckboxField
				label="Hide greeting"
				value={hideGreeting}
				onChange={setHideGreeting}
			/>
			<button type="button" onClick={clear}>
				Clear
			</button>
			{!hideGreeting && (
				<p>
					Hei {firstName} {lastName}
				</p>
			)}
		</>
	)
}
