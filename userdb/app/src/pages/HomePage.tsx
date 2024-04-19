import { Link } from "react-router-dom"

import { Header } from "@react-workshop/ui"

export const HomePage = () => (
	<p>
		Click <Link to="/login">here</Link> to log in
	</p>
)
