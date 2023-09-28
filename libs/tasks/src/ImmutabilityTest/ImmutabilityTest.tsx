import { TextField } from "@prwt/fields"
import { ChangeEvent, useState } from "react"

interface Person {
	firstName: string
	lastName: string
	age: number
}

export const ImmutabilityTest = () => {
	const [person, setPerson] = useState<Person>({
		firstName: "Thomas",
		lastName: "Rudfoss",
		age: 19
	})

	const onFirstNameChange = (newFirstName: string) => {
		setPerson({
			...person,
			firstName: newFirstName
		})
	}
	const onLastNameChange = (newLastName: string) => {
		setPerson({
			...person,
			lastName: newLastName
		})
	}

	return (
		<>
			<TextField
				label="First Name"
				value={person.firstName}
				onChange={onFirstNameChange}
			/>
			<TextField
				label="Last Name"
				value={person.lastName}
				onChange={onLastNameChange}
			/>
		</>
	)
}
