import { useHeading } from "@react-workshop/ui"

import { DebugSessionInfo } from "../DebugSessionInfo"
import { useLogin, useLogout } from "../authDataService"

import { LoginForm } from "./LoginForm"

export interface DataServiceLoginFormProps {}

export const DataServiceLoginForm = (props: DataServiceLoginFormProps) => {
	useHeading("Data service powered login")
	const {
		isSuccess: isLoggedIn,
		mutate: login,
		isPending: isLoggingIn,
		reset: resetSessionData
	} = useLogin()
	const { mutate: logout, isPending: isLoggingOut } = useLogout(() => resetSessionData())

	const isWorking = isLoggingIn || isLoggingOut

	return (
		<>
			{isLoggedIn && (
				<>
					<DebugSessionInfo />
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
