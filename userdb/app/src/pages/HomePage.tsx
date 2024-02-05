import { Link } from "react-router-dom"

export const HomePage = () => {
	return (
		<>
			<h1>Hello world</h1>
			<Link to="users">Users</Link>
		</>
	)
}
