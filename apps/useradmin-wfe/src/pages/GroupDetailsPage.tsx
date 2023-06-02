import { useParams } from "react-router-dom"

import { GroupDetailsServer } from "@prwt/user"

type GroupDetailsPageParams = "groupId"

export const GroupDetailsPage = () => {
	const { groupId } = useParams<GroupDetailsPageParams>()

	if (!groupId) {
		return <p>Missing groupId parameter in url</p>
	}

	return <GroupDetailsServer groupId={groupId} />
}
