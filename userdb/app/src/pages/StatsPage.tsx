import { useEffect, useState } from "react"

import { StatsResponse } from "@react-workshop/userdb-api-clients"

const fetchStats = async () => {
	const response = await fetch("http://localhost:4210/stats")
	const body: StatsResponse = await response.json()
	return body
}

export const StatsPage = () => {
	const [stats, setStats] = useState<StatsResponse>()

	useEffect(() => {
		const doFetchStats = async () => {
			const result = await fetchStats()
			setStats(result)
		}
		doFetchStats()
	}, [])

	return (
		<pre>
			<code>{JSON.stringify(stats, undefined, 2)}</code>
		</pre>
	)
}
