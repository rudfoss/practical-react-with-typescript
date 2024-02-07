import type { StatsResponse } from "@react-workshop/userdb-api-client"

export interface DisplayStatsProps {
	stats: StatsResponse
}

export const DisplayStats = ({ stats }: DisplayStatsProps) => {
	return (
		<dl>
			<dt>Nr of users</dt>
			<dd>{stats.userCount}</dd>
			<dt>Nr of groups</dt>
			<dd>{stats.groupCount}</dd>
			<dt>Nr of sessions</dt>
			<dd>{stats.sessionCount}</dd>
			<dt>Nr of administrators</dt>
			<dd>{stats.adminCount}</dd>
			<dt>Nr of guests</dt>
			<dd>{stats.guestCount}</dd>
		</dl>
	)
}
