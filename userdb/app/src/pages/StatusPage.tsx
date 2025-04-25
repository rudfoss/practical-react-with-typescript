import { LoadingSpinner } from "@prwt/libs-ui"
import { useHealthQuery } from "../healthQueries"

export const StatusPage = () => {
	const { data, error, isLoading, refetch } = useHealthQuery()

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

	if (isLoading) {
		return <LoadingSpinner />
	}

	return (
		<pre>
			<code>{JSON.stringify(data, undefined, 2)}</code>
		</pre>
	)
}
