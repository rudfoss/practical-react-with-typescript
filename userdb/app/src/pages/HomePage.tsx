import { Link } from "react-router-dom"

import { Header } from "@react-workshop/ui"

export const HomePage = () => {
	return (
		<>
			<Header>Hello world</Header>
			<Link to="users">Users</Link>
		</>
	)
}
