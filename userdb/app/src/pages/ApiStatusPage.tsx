import { useHeading } from "@react-workshop/ui"

import { ApiStats } from "../ApiStatus"

export const ApiStatusPage = () => {
	useHeading("API Status")
	return (
		<>
			<h2>Health</h2>
			<h2>Statistics</h2>
			<ApiStats />
		</>
	)
}
