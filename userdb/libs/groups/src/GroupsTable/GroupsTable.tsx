import { Group } from "@react-workshop/userdb-api-client"

import { GroupsTableRow } from "./GroupsTableRow"

export interface GroupsTableProps {
	groups: Group[]
	canDelete?: boolean
	onDelete?: (group: Group) => unknown
}

export const GroupsTable = ({ groups, canDelete, onDelete }: GroupsTableProps) => {
	return (
		<table>
			<thead>
				<tr>
					<th>Id</th>
					<th>Display Name</th>
					<th>Roles</th>
					<th>Is System Group</th>
					<th>Controls</th>
				</tr>
			</thead>
			<tbody>
				{groups.map((group) => (
					<GroupsTableRow
						key={group.id}
						group={group}
						canDelete={canDelete}
						onDelete={() => onDelete?.(group)}
					/>
				))}
			</tbody>
		</table>
	)
}
