import { useEffect, useState } from "react"

import { AppControllerClient, StatsResponse } from "@react-workshop/userdb-api-clients"

export const BetterStatsPage = () => {
	const [stats, setStats] = useState<StatsResponse>()

	useEffect(() => {
		const doFetchStats = async () => {
			const client = new AppControllerClient("http://localhost:4210")
			const data = await client.getStats()
			setStats(data)
		}
		doFetchStats()
	}, [])

	return (
		<pre>
			<code>{JSON.stringify(stats, undefined, 2)}</code>
		</pre>
	)
}
