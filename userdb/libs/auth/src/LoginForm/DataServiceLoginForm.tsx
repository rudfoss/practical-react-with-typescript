import { useQuery } from "@tanstack/react-query"

import { useHeading } from "@react-workshop/ui"

import { DebugSessionInfo } from "../DebugSessionInfo"
import { useAuthDataService, useLogin, useLogout } from "../authDataService"

import { LoginForm } from "./LoginForm"

export interface DataServiceLoginFormProps {}

export const DataServiceLoginForm = (props: DataServiceLoginFormProps) => {
	const { queries } = useAuthDataService()
	useHeading("Data service powered login")
	const {
		isSuccess: isLoggedIn,
		mutate: login,
		isPending: isLoggingIn,
		reset: resetSessionData
	} = useLogin()
	const { mutate: logout, isPending: isLoggingOut } = useLogout(() => resetSessionData())

	const { data: sessionData } = useQuery({ ...queries.session(), enabled: isLoggedIn })

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
		</>
	)
}
