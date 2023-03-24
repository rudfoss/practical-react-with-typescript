import { GroupDTO, useDeleteGroup } from "@prt/data"
import { ConfirmDeleteButton } from "@prt/fields"

export interface GroupsTableRowProps {
	group: GroupDTO
}

export const GroupsTableRow = ({ group }: GroupsTableRowProps) => {
	const { id, name, role } = group
	const { mutate: deleteGroupById, isLoading } = useDeleteGroup()

	const deleteGroup = () => {
		deleteGroupById(id)
	}

	return (
		<tr>
			<td>{id}</td>
			<td>{name}</td>
			<td>{role}</td>
			<td>
				<ConfirmDeleteButton disabled={isLoading} onClick={deleteGroup}>
					Delete
				</ConfirmDeleteButton>
			</td>
		</tr>
	)
}
