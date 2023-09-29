import { Link } from "react-router-dom"

export const Nav = () => {
	return (
		<nav>
			<Link to="/">Home</Link>
			<Link to="/users">Users</Link>
			<Link to="/test-error-boundary">Test error boundary</Link>
			<Link to="/test-network">Test network</Link>
		</nav>
	)
}
