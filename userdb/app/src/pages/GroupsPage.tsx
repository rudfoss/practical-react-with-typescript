import { useState } from "react"
import { useParams } from "react-router-dom"

import { StaticGroupTable, staticGroups } from "@react-workshop/userdb-groups"

export const GroupsPage = () => {
	const { groupId } = useParams<"groupId">()
	const [groups, setGroups] = useState(staticGroups)
	return <StaticGroupTable highlightGroupId={groupId} groups={groups} setGroups={setGroups} />
}
