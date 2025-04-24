import { ReactNode } from "react"
import { StaticGroup } from "./StaticGroups"

export interface ListStaticGroupsProps {
	groups: StaticGroup[]
}

export const ListStaticGroups = ({ groups }: ListStaticGroupsProps) => {
	const groupElements: ReactNode[] = []
	for (const group of groups) {
		groupElements.push(<li>{group.displayName}</li>)
	}

	return <ul>{groupElements}</ul>
}
