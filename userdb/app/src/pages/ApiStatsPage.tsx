import { useQuery } from "@tanstack/react-query"

import { useApiClientsService } from "@react-workshop/userdb-api-clients"

export const ApiStatsPage = () => {
	const { appClient } = useApiClientsService()
	const { data: statsData, isError } = useQuery({
		queryKey: ["stats"],
		queryFn: () => appClient.current.getStats()
	})

	if (isError) {
		return <p>Something went 💥</p>
	}

	return (
		<pre>
			<code>{JSON.stringify(statsData, undefined, 2)}</code>
		</pre>
	)
}
