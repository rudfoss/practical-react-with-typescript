import { ErrorResponse, Link, useNavigate } from "react-router-dom"

export interface RouteErrorPageProps {
	routeError: ErrorResponse
}

export const RouteErrorPage = ({ routeError }: RouteErrorPageProps) => {
	const nav = useNavigate()

	if (routeError.status === 404) {
		return (
			<p>
				The page you tried to get to has gotten away.{" "}
				<button type="button" onClick={() => nav(-1)}>
					Go back
				</button>{" "}
				and try again.
			</p>
		)
	}

	console.error(routeError)
	return <p>Sorry, I don't know what to do with a {routeError.status} error.</p>
}
