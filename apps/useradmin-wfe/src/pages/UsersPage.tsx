import { Link } from "react-router-dom"

import { UsersTableStaticUsers, UsersTableStaticUsersProps } from "@prwt/user"

export const UsersPage = () => {
	const detailsLinkRenderer: UsersTableStaticUsersProps["detailsLinkRenderer"] =
		(userId, text) => {
			return <Link to={`/users/${userId}`}>{text}</Link>
		}

	return <UsersTableStaticUsers detailsLinkRenderer={detailsLinkRenderer} />
}
