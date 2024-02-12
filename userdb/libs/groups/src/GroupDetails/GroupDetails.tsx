import { Group } from "@react-workshop/userdb-api-client"

import { RoleTags } from "../RoleTags"

export interface GroupDetailsProps {
	group: Group
}

export const GroupDetails = ({ group }: GroupDetailsProps) => {
	const { id, displayName, description, isSystemDefined } = group
	return (
		<dl>
			<dt>Id</dt>
			<dd>{id}</dd>
			<dt>Is system defined</dt>
			<dd>{isSystemDefined ? "✅" : "❌"}</dd>
			<dt>Display name</dt>
			<dd>{displayName}</dd>
			<dt>Description</dt>
			<dd>{description}</dd>
			<dt>Roles</dt>
			<dd>
				<RoleTags groupIds={[group.id]} />
			</dd>
		</dl>
	)
}
