import { Link } from "react-router-dom"

export const Nav = () => {
	return (
		<nav>
			<Link to="/">Home</Link>
			<Link to="/users">Users</Link>
			<Link to="/users/a-user">A user</Link>
		</nav>
	)
}
