import { useQuery } from "@tanstack/react-query"
import { useRef } from "react"

import { AppControllerClient } from "@react-workshop/userdb-api-clients"
// import { delay } from "@react-workshop/utils"

import { DisplayStats } from "./DisplayStats"

export const ApiStats = () => {
	const appClient = useRef(new AppControllerClient("//localhost:4210"))
	const { data: stats, error } = useQuery({
		queryKey: ["stats"],
		queryFn: () => appClient.current.getStats(),
		// queryFn: () => delay(appClient.current.getStats(), 1000),
		retry: 0,
		staleTime: 10_000 // 10 seconds
	})

	if (stats) {
		return <DisplayStats stats={stats} />
	}

	if (error) {
		return (
			<>
				<p>Failed to fetch stats from the server...</p>
				<pre>
					<code>{error.message}</code>
				</pre>
			</>
		)
	}

	return <p>Loading stats...</p>
}
