import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom"
import { RouteErrorPage } from "./RouteErrorPage"

export const ErrorPage = () => {
	const error = useRouteError()

	if (isRouteErrorResponse(error)) {
		return <RouteErrorPage routeError={error} />
	}

	console.error(error)
	return (
		<p>
			An error has occurred. Take the <Link to="/">🚁</Link> back to the home
			page and try again.
		</p>
	)
}
