import { useState } from "react"

import { BooleanField, NumericField, TextField } from "@prwt/fields"

export const FieldsPage = () => {
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [age, setAge] = useState(42)
	const [isAdmin, setIsAdmin] = useState(false)

	return (
		<div>
			<TextField label="First Name" value={firstName} setValue={setFirstName} />
			<TextField label="Last Name" value={lastName} setValue={setLastName} />
			<NumericField label="Age" value={age} setValue={setAge} />
			<BooleanField label="Is admin" value={isAdmin} setValue={setIsAdmin} />
		</div>
	)
}
