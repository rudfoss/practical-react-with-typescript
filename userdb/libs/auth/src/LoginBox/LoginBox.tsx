import styled from "@emotion/styled"

import { LoadingSpinner } from "@react-workshop/ui"

import { LoginForm } from "../LoginForm"
import { useAuthService } from "../authService/authService"

const Container = styled.div`
	display: flex;
	justify-content: center;
	> div {
		flex: 0 1 400px;
	}
`

/**
 * Provides a login form in a box or login information if already authenticated.
 */
export const LoginBox = () => {
	const { login, logout, isWorking, user, loginError } = useAuthService()

	return (
		<>
			<Container>
				<div>
					{!user && (
						<LoginForm
							onLogin={(username, password) => login({ username, password })}
							disabled={isWorking}
							errorMessage={loginError?.message}
						/>
					)}
					{user && (
						<div>
							<p>Hello {user.displayName} 👋</p>
							<button onClick={() => logout()} disabled={isWorking}>
								Log out
							</button>
						</div>
					)}
				</div>
			</Container>
			{isWorking && <LoadingSpinner />}
		</>
	)
}
