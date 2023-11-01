import { ErrorResponse } from "react-router-dom"

export interface NotFoundPageProps {
	routeError: ErrorResponse
}

export const NotFoundPage = ({ routeError }: NotFoundPageProps) => {
	if (routeError.status === 404) {
		return <p>The page could not be found</p>
	}

	console.error({ routeError })
	return <p>Unknown route error occurred</p>
}
