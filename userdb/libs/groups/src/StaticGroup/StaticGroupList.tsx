import { staticGroups } from "../data"

export const StaticGroupList = () => (
	<ul>
		{staticGroups.map((group) => (
			<li key={group.id}>
				{group.id} - <strong>{group.displayName}</strong>
			</li>
		))}
	</ul>
)
