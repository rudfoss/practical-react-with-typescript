import { Group } from "./staticGroups"

export interface GroupDetailsProps {
	group: Group
}

export const GroupDetails = ({ group }: GroupDetailsProps) => {
	const { id, name } = group
	return (
		<dl>
			<dt>Group Id</dt>
			<dd>{id}</dd>
			<dt>Group name</dt>
			<dd>{name}</dd>
		</dl>
	)
}
