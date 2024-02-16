import { useState } from "react"

import { StatsResponse } from "@react-workshop/userdb-api-clients"

const loadData = async () => {
	const response = await fetch("http://localhost:4210/stats")
	const body: StatsResponse = await response.json()
	return body
}

export const NaiveLoadFromServerPage = () => {
	const [serverData, setServerData] = useState<StatsResponse>()
	const doFetch = async () => {
		const serverStats = await loadData()
		setServerData(serverStats)
	}

	return (
		<>
			<pre>
				<code>{JSON.stringify(serverData, undefined, 2)}</code>
			</pre>
			<button onClick={doFetch}>Load data</button>
		</>
	)
}
