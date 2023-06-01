import { Link } from "react-router-dom"

export const HomePage = () => {
	return (
		<>
			<h1>User administration</h1>
			<p>Welcome, please navigate to the underlying tools.</p>
			<ul>
				<li>
					<Link to="/users">Users</Link>
				</li>
			</ul>
		</>
	)
}
