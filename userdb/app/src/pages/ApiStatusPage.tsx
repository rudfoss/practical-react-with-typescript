import { useHeading } from "@react-workshop/ui"

import { ApiHealth, ApiStats } from "../ApiStatus"

export const ApiStatusPage = () => {
	useHeading("API Status")
	return (
		<>
			<h2>Health</h2>
			<ApiHealth />
			<h2>Statistics</h2>
			<ApiStats />
		</>
	)
}
