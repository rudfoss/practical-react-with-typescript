import { isRouteErrorResponse, useRouteError } from "react-router-dom"

import { useHeading } from "@react-workshop/ui"

import { RouteErrorPage } from "./RouteErrorPage"

export const ErrorPage = () => {
	useHeading("An error has occurred")
	const error = useRouteError()

	if (isRouteErrorResponse(error)) {
		return <RouteErrorPage routeError={error} />
	}

	return <p>💥</p>
}
