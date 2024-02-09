import { DebugSessionInfo } from "../DebugSessionInfo"
import { useAuthService } from "../authService/authService"

import { LoginForm } from "./LoginForm"

export const AuthServiceLoginForm = () => {
	const { login, logout, refreshSession, isWorking, session: sessionData } = useAuthService()

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
