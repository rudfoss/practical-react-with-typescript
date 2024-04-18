import { Link } from "react-router-dom"

import { Header } from "../Header"

export const HomePage = () => (
	<>
		<Header>Hello there from the router 🚀</Header>
		<p>
			Click <Link to="/login">here</Link> to log in
		</p>
	</>
)
