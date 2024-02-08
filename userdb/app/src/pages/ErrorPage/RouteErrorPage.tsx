import { ErrorResponse, Link, useNavigate } from "react-router-dom"

import { useHeading } from "@react-workshop/ui"
import { useAuthService } from "@react-workshop/userdb-libs-auth"

export interface RouteErrorPageProps {
	routeError: ErrorResponse
}

export const RouteErrorPage = ({ routeError }: RouteErrorPageProps) => {
	useHeading("The page does not exist 🙈")
	const { user } = useAuthService()
	const nav = useNavigate()

	if (routeError.status === 404) {
		return (
			<p>
				{user && `Uh, hey ${user.displayName} 😓... `}It appears this page does not exist. You can
				<button type="button" onClick={() => nav(-1)}>
					go back to the previous page
				</button>{" "}
				and try again, or head <Link to="/">home</Link> and start from the top.
			</p>
		)
	}

	console.error(routeError)
	return <p>Sorry, I don't know what to do with a {routeError.status} error.</p>
}
