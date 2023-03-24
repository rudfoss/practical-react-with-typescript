import { Link, Outlet } from "react-router-dom"

export const MainLayout = () => {
	return (
		<div>
			<nav>
				<Link to="/">Home</Link>
				<Link to="/groups">Groups</Link>
			</nav>
			<main>
				<Outlet />
			</main>
		</div>
	)
}
