import { useParams } from "react-router-dom"

import { StaticGroupTable } from "@react-workshop/userdb-libs-groups"

export const StaticGroupPage = () => {
	const { groupId } = useParams<"groupId">()
	return <StaticGroupTable highlightGroupId={groupId} />
}
