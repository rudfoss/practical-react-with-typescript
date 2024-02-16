import { useQuery } from "@tanstack/react-query"

import { AppControllerClient } from "@react-workshop/userdb-api-clients"

const appClient = new AppControllerClient("http://localhost:4210")

const useHealthData = () =>
	useQuery({
		queryKey: ["health"],
		queryFn: () => appClient.getHealth()
	})

export const ApiHealthPage = () => {
	const { data: healthData, isError } = useHealthData()

	if (isError) {
		return <p>Something went 💥</p>
	}

	return (
		<pre>
			<code>{JSON.stringify(healthData, undefined, 2)}</code>
		</pre>
	)
}
