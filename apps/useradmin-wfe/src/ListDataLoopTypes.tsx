import { Group } from "./staticGroups"

export interface ListDataProps {
	groups: Group[]
}

export const ListData = ({ groups }: ListDataProps) => {
	const groupElements: React.ReactNode[] = []
	for (const group of groups) {
		const groupElement = (
			<li key={group.id}>
				{group.name} - {group.id}
			</li>
		)
		groupElements.push(groupElement)
	}

	const groupElementMap: React.ReactNode[] = groups.map((group) => {
		return (
			<li key={group.id}>
				{group.name} - {group.id}
			</li>
		)
	})

	return (
		<ol>
			{groups.map((group) => (
				<li key={group.id}>
					{group.name} - {group.id}
				</li>
			))}
		</ol>
	)
}
