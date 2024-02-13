import { useQuery } from "@tanstack/react-query"
import { useRef } from "react"

import { AppControllerClient } from "@react-workshop/userdb-api-clients"
// import { delay } from "@react-workshop/utils"

import { DisplayHealth } from "./DisplayHealth"

export const ApiHealth = () => {
	const appClient = useRef(new AppControllerClient("//localhost:4210"))
	const { data: health, error } = useQuery({
		queryKey: ["health"],
		queryFn: () => appClient.current.getHealth(),
		// queryFn: () => delay(appClient.current.getHealth(), 1000),
		retry: 0,
		staleTime: 10_000 // 10 seconds
	})

	if (health) {
		return <DisplayHealth health={health} />
	}

	if (error) {
		return (
			<>
				<p>Failed to fetch health from the server...</p>
				<pre>
					<code>{error.message}</code>
				</pre>
			</>
		)
	}

	return <p>Loading health...</p>
}
