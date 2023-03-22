import { useState } from "react"

import { BooleanField } from "./BooleanField"
import { Field } from "./Field"
import { TextField } from "./TextField"

interface FormProps {
	children: React.ReactNode
}

export const Form = ({ children }: FormProps) => {
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [address, setAddress] = useState("")
	const [isActive, setIsActive] = useState(false)

	const onSubmit = () => {
		console.log({
			firstName,
			lastName,
			address,
			isActive
		})
	}

	return (
		<>
			{children}
			<Field label="Dynamic field">
				<input type="text" value={firstName} onChange={(evt) => setFirstName(evt.target.value)} />
			</Field>
			<TextField label="Fornavn" value={firstName} onChange={setFirstName} />
			<TextField label="Etternavn" value={lastName} onChange={setLastName} />
			<TextField label="Adresse" value={address} onChange={setAddress} />
			<BooleanField label="Active" value={isActive} onChange={setIsActive} />
			<button onClick={onSubmit}>Submit</button>
		</>
	)
}
