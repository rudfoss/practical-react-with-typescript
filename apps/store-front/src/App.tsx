import { useState } from "react"

import { BooleanField } from "./BooleanField"
import { NumericField } from "./NumericField"
import { TextField } from "./TextField"

export const App = () => {
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")

	return (
		<>
			<TextField label="First Name" value={firstName} setValue={setFirstName} />
			<TextField label="Last Name" value={lastName} setValue={setLastName} />
			<BooleanField label="Check me" />
			<NumericField label="Age" max={100} allowDecimals />
		</>
	)
}
