import { useMutation } from "@tanstack/react-query"
import { useEffect, useRef } from "react"

import { LoadingSpinner, useHeading } from "@react-workshop/ui"
import { AuthControllerClient, LoginRequest } from "@react-workshop/userdb-api-client"
import {
	DebugSessionInfo,
	LoginForm,
	useSessionTokenService
} from "@react-workshop/userdb-libs-auth"
import { delay } from "@react-workshop/utils"

export const BasicLoginPage = () => {
	useHeading("Basic login")
	const { setSessionToken } = useSessionTokenService()
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
		setSessionToken(sessionData?.token)
	}, [sessionData?.token, setSessionToken])

	const isWorking = isLoggingIn || isLoggingOut

	return (
		<>
			{sessionData && (
				<>
					<DebugSessionInfo sessionData={sessionData} />
					<button onClick={() => logout()}>Logout</button>
				</>
			)}
			<LoginForm
				onLogin={(username, password) => login({ username, password })}
				disabled={isWorking}
			/>
			{isWorking && <LoadingSpinner />}
		</>
	)
}
