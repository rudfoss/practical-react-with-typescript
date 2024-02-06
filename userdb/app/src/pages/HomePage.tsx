import { Link } from "react-router-dom"

import { Header } from "@react-workshop/ui"

export const HomePage = () => {
	return (
		<>
			<Header>Hello world</Header>
			<Link to="users">Users</Link>
			<Link to="users/67dc12eb-81dc-4a4a-9fe0-12cee1d11674">Single user</Link>
			<Link to="fields">Fields</Link>
		</>
	)
}
