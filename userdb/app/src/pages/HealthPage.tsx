import { useQuery } from "@tanstack/react-query"

import { LoadingSpinner } from "@react-workshop/ui"
import { useApiClientsService } from "@react-workshop/userdb-api-clients"

const useHealthQuery = () => {
	const { appClient } = useApiClientsService()
	return useQuery({
		queryKey: ["health"],
		queryFn: () => appClient.current.getHealth()
	})
}

export const HealthPage = () => {
	const { data, isLoading } = useHealthQuery()

	if (isLoading) {
		return <LoadingSpinner />
	}

	return (
		<pre>
			<code>{JSON.stringify(data, undefined, 2)}</code>
		</pre>
	)
}
