import { Link } from "react-router-dom"

import { UsersTableStaticUsers, UsersTableStaticUsersProps } from "@prwt/user"
import { useWindowTitle } from "@prwt/utils"

export const UsersPage = () => {
	useWindowTitle("Users")

	const detailsLinkRenderer: UsersTableStaticUsersProps["detailsLinkRenderer"] =
		(userId, text) => {
			return <Link to={`/users/${userId}`}>{text}</Link>
		}

	return <UsersTableStaticUsers detailsLinkRenderer={detailsLinkRenderer} />
}
