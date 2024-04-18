import { useState } from "react"
import { useParams } from "react-router-dom"

import { StaticGroupTable } from "@react-workshop/userdb-groups"

import { staticGroups } from "../../../groups/src/staticGroups"

export const GroupsPage = () => {
	const { groupId } = useParams<"groupId">()
	const [groups, setGroups] = useState(staticGroups)
	return <StaticGroupTable highlightGroupId={groupId} groups={groups} setGroups={setGroups} />
}
