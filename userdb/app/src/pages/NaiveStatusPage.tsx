import { LoadingSpinner } from "@prwt/libs-ui"
import { useEffect, useState } from "react"

export const StatusPage = () => {
	const [healthData, setHealthData] = useState()
	const [isLoading, setIsLoading] = useState(false)
	const [_, setError] = useState<Error>()

	useEffect(() => {
		const getHealth = async () => {
			setIsLoading(true)
			const response = await fetch("http://localhost:4000/health")
			await new Promise((resolve) => setTimeout(() => resolve(true), 5000))

			if (!response.ok) {
				setError(new Error("It failed"))
				setIsLoading(false)
				return
			}

			const data = await response.json()
			setHealthData(data)
			setIsLoading(false)
		}
		getHealth()
	}, [])

	if (isLoading) {
		return <LoadingSpinner />
	}

	return (
		<pre>
			<code>{JSON.stringify(healthData, undefined, 2)}</code>
		</pre>
	)
}
