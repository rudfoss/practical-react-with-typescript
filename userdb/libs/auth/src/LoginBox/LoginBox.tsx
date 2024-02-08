import styled from "@emotion/styled"

import { LoginForm } from "../LoginForm"
import { useAuthService } from "../authService"

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
	const { login, logout, isWorking, user } = useAuthService()

	return (
		<Container>
			<div>
				{!user && (
					<LoginForm
						onLogin={(username, password) => login({ username, password })}
						disabled={isWorking}
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
	)
}
