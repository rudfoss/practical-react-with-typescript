import { useQuery } from "@tanstack/react-query"
import { useRef } from "react"

import { AppControllerClient } from "@react-workshop/userdb-api-client"
import { delay } from "@react-workshop/utils"

export const ApiStats = () => {
	const appClient = useRef(new AppControllerClient("//localhost:4210"))
	const { data: stats, error } = useQuery({
		queryKey: ["stats"],
		queryFn: () => delay(appClient.current.getStats(), 1000),
		retry: 0,
		staleTime: 10_000 // 10 seconds
	})

	if (stats) {
		return (
			<dl>
				<dt>Nr of users</dt>
				<dd>{stats.userCount}</dd>
				<dt>Nr of groups</dt>
				<dd>{stats.groupCount}</dd>
				<dt>Nr of sessions</dt>
				<dd>{stats.sessionCount}</dd>
				<dt>Nr of administrators</dt>
				<dd>{stats.adminCount}</dd>
				<dt>Nr of guests</dt>
				<dd>{stats.guestCount}</dd>
			</dl>
		)
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
