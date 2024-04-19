import { Link } from "react-router-dom"

export const MainMenu = () => (
	<>
		<Link to="/">Home</Link>
		<Link to="/login">Login</Link>
		<Link to="/groups">Groups</Link>
		<Link to="/optimize">Optimization</Link>
		<Link to="/stats">Stats</Link>
	</>
)
