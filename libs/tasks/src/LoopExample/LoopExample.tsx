import { useState } from "react"

import { Person } from "./people"

export interface LoopExampleProps {
	people: Person[]
}

export const LoopExample = ({ people: initialPeople }: LoopExampleProps) => {
	const [people, setPeople] = useState(initialPeople)

	const moveItem = () => {
		const newPeopleList = [...people]
		const sourceItem = newPeopleList.splice(0, 1)[0]
		newPeopleList.splice(3, 0, sourceItem)
		setPeople(newPeopleList)
	}

	const listItems = people.map((person) => (
		<li key={person.id}>{person.name}</li>
	))

	return (
		<>
			<ul>{listItems}</ul>
			<button onClick={moveItem}>Replace item</button>
		</>
	)
}
