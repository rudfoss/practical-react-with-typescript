import { LoadingSpinner } from "@prwt/libs-ui"
import { useUserDbApiService } from "@prwt/userdb-api-spec/react"
import { useHealthQuery } from "../healthQueries"

export const StatusPage = () => {
	const { appClient } = useUserDbApiService()
	const {
		data: health,
		error,
		isLoading: isLoadingHealth,
		refetch
	} = useHealthQuery(appClient)

	if (error) {
		return (
			<p>
				Something went wrong! Try again?{" "}
				<button type="button" onClick={() => refetch()}>
					Refetch
				</button>
			</p>
		)
	}

	if (isLoadingHealth) {
		return <LoadingSpinner />
	}

	return (
		<>
			<pre>
				<code>{health?.ok}</code>
			</pre>
		</>
	)
}
