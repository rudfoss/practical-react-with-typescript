import { useState } from "react"

import { Group, staticGroups } from "../staticGroups"

import { GroupsList, GroupsListProps } from "./GroupsList"

export const GroupsListStaticGroups = ({
	detailsLinkRenderer
}: Pick<GroupsListProps, "detailsLinkRenderer">) => {
	const [groups, setGroups] = useState<Group[]>(staticGroups)

	return (
		<GroupsList
			groups={groups}
			setGroups={setGroups}
			detailsLinkRenderer={detailsLinkRenderer}
		/>
	)
}
