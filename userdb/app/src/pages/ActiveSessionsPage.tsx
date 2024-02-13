import { useQuery } from "@tanstack/react-query"

import { DateTime } from "@react-workshop/ui"
import { useAuthDataService, useLogEveryoneOut } from "@react-workshop/userdb-libs-auth"
import { Avatar } from "@react-workshop/userdb-libs-users"

export const ActiveSessionsPage = () => {
	const { queries } = useAuthDataService()
	const { mutate: logEveryoneOut } = useLogEveryoneOut()
	const { data: sessions, dataUpdatedAt } = useQuery(queries.sessions())

	return (
		<>
			<button onClick={() => logEveryoneOut()}>Log everyone else out</button>
			<p>
				Last fetched: <DateTime dateTime={dataUpdatedAt} />
			</p>
			<table>
				<thead>
					<tr>
						<td>Created At</td>
						<td>Expires At</td>
						<td>User</td>
					</tr>
				</thead>
				<tbody>
					{sessions?.map((session) => (
						<tr key={session.token}>
							<td>
								<DateTime dateTime={session.createdAt} />
							</td>
							<td>
								<DateTime dateTime={session.expiresAt} />
							</td>
							<td>
								<Avatar userId={session.userId} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	)
}
