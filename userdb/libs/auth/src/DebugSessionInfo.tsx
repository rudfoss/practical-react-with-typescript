import { useQuery } from "@tanstack/react-query"

import { UserSession } from "@react-workshop/userdb-api-client"

import { useAuthDataService } from "./authDataService"

export interface DebugSessionInfoProps {
	session?: UserSession
}

export const DebugSessionInfo = ({ session }: DebugSessionInfoProps) => {
	const { queries } = useAuthDataService()
	const { data: sessionFromQuery } = useQuery({ ...queries.session(), enabled: !session })

	const sessionData = session ?? sessionFromQuery

	if (sessionData) {
		return (
			<>
				<h3>User is authenticated</h3>
				<dl>
					<dt>Created</dt>
					<dd>{new Date(sessionData.createdAt).toLocaleString()}</dd>
					<dt>Expires</dt>
					<dd>{new Date(sessionData.expiresAt).toLocaleString()}</dd>
					<dt>Id</dt>
					<dd>
						<code>{sessionData.userId}</code>
					</dd>
					<dt>Token</dt>
					<dd>
						<code>{sessionData.token}</code>
					</dd>
				</dl>
			</>
		)
	}

	return
}
