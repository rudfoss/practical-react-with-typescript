import { Link } from "react-router-dom"

import { GroupsListProps, GroupsListStaticGroups } from "@prwt/user"

export const GroupsPage = () => {
	const detailsLinkRenderer: Pick<
		GroupsListProps,
		"detailsLinkRenderer"
	>["detailsLinkRenderer"] = (userId, text) => {
		return <Link to={`/groups/${userId}`}>{text}</Link>
	}

	return <GroupsListStaticGroups detailsLinkRenderer={detailsLinkRenderer} />
}
