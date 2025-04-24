import { StaticGroup } from "./staticGroups"

export interface ListStaticGroupsProps {
	groups: StaticGroup[]
}

export const ListStaticGroups = ({ groups }: ListStaticGroupsProps) => (
	<ul>
		{groups.map((group) => (
			<li key={group.id}>{group.displayName}</li>
		))}
	</ul>
)
