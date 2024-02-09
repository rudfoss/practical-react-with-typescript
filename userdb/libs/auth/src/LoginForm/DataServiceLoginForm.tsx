import { useQuery } from "@tanstack/react-query"

import { DebugSessionInfo } from "../DebugSessionInfo"
import { useAuthDataService, useLogin, useLogout, useRefreshSession } from "../authDataService"

import { LoginForm } from "./LoginForm"

export const DataServiceLoginForm = () => {
	const { queries } = useAuthDataService()
	const {
		isSuccess: isLoggedIn,
		mutate: login,
		isPending: isLoggingIn,
		reset: resetSessionData
	} = useLogin()
	const { mutate: logout, isPending: isLoggingOut } = useLogout(() => resetSessionData())
	const { mutate: refreshSession, isPending: isRefreshingSession } = useRefreshSession()

	const { data: sessionData } = useQuery({ ...queries.session(), enabled: isLoggedIn })

	const isWorking = isLoggingIn || isLoggingOut || isRefreshingSession

	return (
		<>
			{sessionData && (
				<>
					<DebugSessionInfo sessionData={sessionData} />
					<button onClick={() => refreshSession()} disabled={isWorking}>
						Refresh
					</button>
					<button onClick={() => logout()} disabled={isWorking}>
						Logout
					</button>
				</>
			)}
			<LoginForm
				onLogin={(username, password) => login({ username, password })}
				disabled={isWorking}
			/>
		</>
	)
}
