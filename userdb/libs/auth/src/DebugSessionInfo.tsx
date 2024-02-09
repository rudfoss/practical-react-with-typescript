import { UserSession } from "@react-workshop/userdb-api-client"

import { useSessionTokenService } from "./authDataService"

export interface DebugSessionInfoProps {
	sessionData: UserSession
}

export const DebugSessionInfo = ({ sessionData }: DebugSessionInfoProps) => {
	const { sessionToken } = useSessionTokenService()

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
					<dt>Token from session token service</dt>
					<dd>
						<code>{sessionToken}</code>
					</dd>
				</dl>
			</>
		)
	}

	return
}
