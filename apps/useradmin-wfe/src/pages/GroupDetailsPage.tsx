import { useParams } from "react-router-dom"

import { GroupDetails, staticGroups } from "@prwt/user"

type GroupDetailsPageParams = "groupId"

export const GroupDetailsPage = () => {
	const { groupId } = useParams<GroupDetailsPageParams>()

	if (!groupId) {
		return <p>Missing groupId parameter in url</p>
	}

	const group = staticGroups.find((group) => group.id === groupId)

	if (!group) {
		return <p>No such group</p>
	}

	return <GroupDetails group={group} />
}
