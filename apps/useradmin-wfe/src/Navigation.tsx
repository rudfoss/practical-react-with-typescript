import { Link } from "react-router-dom"

export const Navigation = () => {
	return (
		<nav>
			<Link to="/">Home</Link>
			<Link to="/users">Users</Link>
		</nav>
	)
}
