import { useQuery } from "@tanstack/react-query"

import { LoadingSpinner } from "@react-workshop/ui"
import { useApiClientsService } from "@react-workshop/userdb-api-clients"

const useStatsQuery = () => {
	const { appClient } = useApiClientsService()
	return useQuery({
		queryKey: ["users"],
		queryFn: async () => {
			const data = await appClient.current.getStats()
			return data
		}
	})
}

export const BetterStatsPage = () => {
	const { data, isLoading } = useStatsQuery()

	if (isLoading) {
		return <LoadingSpinner />
	}

	return (
		<pre>
			<code>{JSON.stringify(data, undefined, 2)}</code>
		</pre>
	)
}
