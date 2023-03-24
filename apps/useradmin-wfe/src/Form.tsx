import { memo, useState } from "react"

import { BooleanField, NumericField, TextField } from "@prt/fields"

import { InBetween } from "./InBetween"

export const Form = memo(() => {
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [address, setAddress] = useState("")
	const [isActive, setIsActive] = useState(false)
	const [age, setAge] = useState(0)

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
			<TextField label="Fornavn" value={firstName} onChange={setFirstName} />
			<InBetween lastName={lastName} setLastName={setLastName} />
			<TextField label="Adresse" value={address} onChange={setAddress} />
			<BooleanField label="Active" value={isActive} onChange={setIsActive} />
			<NumericField label="Age" value={age} onChange={setAge} min={0} max={60} />
			<button onClick={onSubmit}>Submit</button>
		</>
	)
})
