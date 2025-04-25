import { LoadingSpinner } from "@prwt/libs-ui"
import { useHealthQuery, useStatsQuery } from "../healthQueries"

export const StatusPage = () => {
	const { data: health, error, isLoading: isLoadingHealth, refetch } = useHealthQuery()
	const { data: stats, isLoading: isLoadingStats } = useStatsQuery()

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

	if (isLoadingStats || isLoadingHealth) {
		return <LoadingSpinner />
	}

	return (
		<>
		<dl>
			<dt>Nr of users</dt>
			<dd>{stats.userCount}</dd>
			<dt>Nr of groups</dt>
			<dd>{stats.groupCount}</dd>
		</dl>
		<pre>
			<code>{JSON.stringify(health, undefined, 2)}</code>
		</pre>
		</>
	)
}
