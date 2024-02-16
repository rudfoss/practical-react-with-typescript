import { useParams } from "react-router-dom"

import { GroupDetails, staticGroups } from "@react-workshop/userdb-libs-groups"

export const GroupDetailsPage = () => {
	const { groupId } = useParams<"groupId">()

	const group = staticGroups.find((group) => group.id === groupId)

	if (!group) {
		return <p>No such group found</p>
	}

	return <GroupDetails group={group} />
}
