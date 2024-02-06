import { Link } from "react-router-dom"

export const MainMenu = () => {
	return (
		<nav>
			<Link to="/">Home</Link>
			<Link to="/users">Users</Link>
			<Link to="/users/67dc12eb-81dc-4a4a-9fe0-12cee1d11674">Single user</Link>
			<Link to="/groups">Groups</Link>
			<Link to="/fields">Fields</Link>
		</nav>
	)
}
