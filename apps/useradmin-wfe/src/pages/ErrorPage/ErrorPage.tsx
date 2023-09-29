import { useRouteError, isRouteErrorResponse } from "react-router-dom"

import { NotFoundPage } from "./NotFoundPage"

export const ErrorPage = () => {
	const error = useRouteError()

	if (isRouteErrorResponse(error)) {
		return <NotFoundPage routeError={error} />
	}

	console.error({ error })
	return <p>Ooops I did it again :(</p>
}
