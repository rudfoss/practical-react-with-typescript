import { useState } from "react"

import { TextField } from "@prwt/fields"
import { IGroupDTO } from "@prwt/useradmin-wbe-client"

export interface GroupDetailsProps {
	group: IGroupDTO
	onSave?: (updatedGroup: IGroupDTO) => unknown
}

export const GroupDetails = ({ group, onSave }: GroupDetailsProps) => {
	const { id } = group
	const [name, setName] = useState(group.name)
	const [description, setDescription] = useState(group.description ?? "")

	const saveGroup = () => {
		onSave?.({
			...group,
			name,
			description
		})
	}
	const undoChanges = () => {
		setName(group.name)
		setDescription(group.description ?? "")
	}

	return (
		<>
			<dl>
				<dt>Group Id</dt>
				<dd>{id}</dd>
				<dt>Group name</dt>
				<dd>
					<TextField label="Name" value={name} onChange={setName} />
				</dd>
				<dt>Description</dt>
				<dd>
					<TextField
						label="Description"
						value={description}
						onChange={setDescription}
					/>
				</dd>
			</dl>
			<button onClick={saveGroup}>Save</button>
			<button onClick={undoChanges}>Undo</button>
		</>
	)
}
