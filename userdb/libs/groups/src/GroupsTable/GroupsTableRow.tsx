import { Link } from "react-router-dom"

import { Group } from "@react-workshop/userdb-api-clients"

export interface GroupsTableRowProps {
	group: Group
	canDelete?: boolean
	onDelete?: () => unknown
}

export const GroupsTableRow = ({ group, canDelete, onDelete }: GroupsTableRowProps) => {
	return (
		<tr>
			<td>
				<Link to={`/groups/${group.id}`}>{group.id}</Link>
			</td>
			<td>{group.displayName}</td>
			<td>{group.roles.join(", ")}</td>
			<td>{group.isSystemDefined ? "✅" : "❌"}</td>
			<td>
				{onDelete && (
					<button onClick={() => onDelete()} disabled={!canDelete}>
						❌
					</button>
				)}
			</td>
		</tr>
	)
}
