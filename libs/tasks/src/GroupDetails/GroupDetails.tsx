import { useState } from "react"

import { TextField } from "@prwt/fields"

import { Group } from "./group"

export interface GroupDetailsProps {
	initialGroup: Group
	onChange: (newGroup: Group) => unknown
}

export const GroupDetails = ({ initialGroup, onChange }: GroupDetailsProps) => {
	const [group, setGroup] = useState(initialGroup)
	const isNotModified = Object.is(group, initialGroup)

	const changePropertyOnGroup =
		<T extends keyof Group>(propertyName: T) =>
		(newPropertyValue: Group[T]) => {
			setGroup({
				...group,
				[propertyName]: newPropertyValue
			})
		}

	const save = () => {
		onChange(group)
	}
	const reset = () => {
		setGroup(initialGroup)
	}

	return (
		<>
			<dl>
				<dt>Id</dt>
				<dd>{group.id}</dd>
				<dt>Name</dt>
				<dd>
					<TextField
						label="Name"
						value={group.name}
						onChange={changePropertyOnGroup("name")}
					/>
				</dd>
				<dt>Role</dt>
				<dd>
					<TextField
						label="Role"
						value={group.role}
						onChange={changePropertyOnGroup("role")}
					/>
				</dd>
				<dt>Description</dt>
				<dd>
					<TextField
						label="Description"
						value={group.description}
						onChange={changePropertyOnGroup("description")}
					/>
				</dd>
			</dl>
			<button onClick={save}>Save</button>
			<button onClick={reset} disabled={isNotModified}>
				Reset
			</button>
		</>
	)
}
