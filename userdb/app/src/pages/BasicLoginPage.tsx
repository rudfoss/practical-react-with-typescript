import { useMutation } from "@tanstack/react-query"
import { useEffect, useRef } from "react"

import { LoadingSpinner } from "@react-workshop/ui"
import {
	AuthControllerClient,
	LoginRequest,
	setBearerToken
} from "@react-workshop/userdb-api-client"
import { LoginForm } from "@react-workshop/userdb-libs-auth"
import { delay } from "@react-workshop/utils"

export const BasicLoginPage = () => {
	const authClient = useRef(new AuthControllerClient("//localhost:4210"))
	const {
		data: sessionData,
		mutate: login,
		isPending: isLoggingIn,
		reset: resetSessionData
	} = useMutation({
		mutationFn: (loginRequest: LoginRequest) => delay(authClient.current.login(loginRequest), 3000)
	})

	const { mutate: logout, isPending: isLoggingOut } = useMutation({
		mutationFn: () => delay(authClient.current.logout(), 2000),
		onSuccess: () => {
			resetSessionData()
		}
	})

	useEffect(() => {
		setBearerToken(sessionData?.token)
	}, [sessionData?.token])

	const isWorking = isLoggingIn || isLoggingOut

	return (
		<>
			{isWorking && <LoadingSpinner />}
			{sessionData && (
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
					<button onClick={() => logout()}>Logout</button>
				</>
			)}
			<LoginForm
				onLogin={(username, password) => login({ username, password })}
				disabled={isWorking}
			/>
		</>
	)
}
