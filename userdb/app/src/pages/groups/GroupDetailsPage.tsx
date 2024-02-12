import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

import { LoadingSpinner, useHeading } from "@react-workshop/ui"
import { GroupDetails, useGroupsDataService } from "@react-workshop/userdb-libs-groups"

export const GroupDetailsPage = () => {
	const { groupId } = useParams<"groupId">()
	const { queries } = useGroupsDataService()
	const { data: group } = useQuery({ ...queries.byId(groupId ?? ""), enabled: !!groupId })
	useHeading(group ? `Group details for ${group.displayName}` : "Group details")

	if (group) {
		return <GroupDetails group={group} />
	}

	return <LoadingSpinner />
}
