import { useQuery } from "@tanstack/react-query"

import { AppControllerClient } from "@react-workshop/userdb-api-clients"

const appClient = new AppControllerClient("http://localhost:4210")

const useStatsData = () =>
	useQuery({
		queryKey: ["stats"],
		queryFn: () => appClient.getStats()
	})

export const ApiStatsPage = () => {
	const { data: statsData, isError } = useStatsData()

	if (isError) {
		return <p>Something went 💥</p>
	}

	return (
		<pre>
			<code>{JSON.stringify(statsData, undefined, 2)}</code>
		</pre>
	)
}
