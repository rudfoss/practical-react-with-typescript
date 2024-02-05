import { Link } from "react-router-dom"

import { StaticUsersList } from "@react-workshop/userdb-libs-users"

export const UsersPage = () => {
	return (
		<>
			<Link to="/">Home</Link>
			<StaticUsersList />
		</>
	)
}
