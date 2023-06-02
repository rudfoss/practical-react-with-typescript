import { useState } from "react"

import { Group, staticGroups } from "../staticGroups"

import { GroupsList } from "./GroupsList"

export const GroupsListStaticGroups = () => {
	const [groups, setGroups] = useState<Group[]>(staticGroups)

	return <GroupsList groups={groups} setGroups={setGroups} />
}
