import { useState } from "react"

import { TextField } from "@prwt/fields"

import { Person } from "./people"

export interface LoopExampleProps {
	people: Person[]
}

export const LoopExample = ({ people: initialPeople }: LoopExampleProps) => {
	const [people, setPeople] = useState(initialPeople)

	const replaceItem = () => {
		const newPeopleList = [...people]
		newPeopleList.splice(1, 1, {
			id: "",
			name: "Odin",
			age: 1293
		})
		setPeople(newPeopleList)
	}

	const listItems = people.map((person) => (
		<li key={person.id}>{person.name}</li>
	))

	return (
		<>
			<ul>{listItems}</ul>
			<button onClick={replaceItem}>Replace item</button>
		</>
	)
}
