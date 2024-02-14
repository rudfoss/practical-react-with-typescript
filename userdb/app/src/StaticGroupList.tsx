import { staticGroups } from "./staticGroups"

export const StaticGroupList = () => {
	return (
		<ul>
			{staticGroups.map((group) => (
				<li key={group.id}>
					{group.id} - <strong>{group.displayName}</strong>
				</li>
			))}
		</ul>
	)
}
