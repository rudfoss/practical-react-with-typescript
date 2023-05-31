import { useState } from "react"

import { BooleanField } from "./BooleanField"
import { TextField } from "./TextField"

export const App = () => {
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [isAdmin, setIsAdmin] = useState(false)
	const [isDisabled, setIsDisabled] = useState(false)

	return (
		<>
			<TextField label="First name" value={firstName} onChange={setFirstName} />
			<TextField label="Last name" value={lastName} onChange={setLastName} />
			<BooleanField label="Make admin" value={isAdmin} onChange={setIsAdmin} />
			<BooleanField
				label="Disabled"
				value={isDisabled}
				onChange={setIsDisabled}
			/>
			<p>
				Hi {isAdmin ? "admin" : ""} {firstName} {lastName}{" "}
				{isDisabled ? "disabled" : ""}
			</p>
		</>
	)
}
