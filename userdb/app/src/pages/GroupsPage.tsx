import { Link } from "react-router-dom"

import { StaticGroupList } from "@react-workshop/userdb-libs-groups"

export const GroupsPage = () => {
	return (
		<>
			<Link to="/">Home</Link>
			<StaticGroupList />
		</>
	)
}
