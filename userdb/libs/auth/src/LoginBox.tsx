import styled from "@emotion/styled"

import { LoadingSpinner } from "@react-workshop/ui"

import { LoginForm } from "./LoginForm"
import { useAuthService } from "./authService"

const Container = styled.div`
	display: flex;
	justify-content: center;
	> div {
		flex: 0 1 400px;
	}
`
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LoginBoxProps {}

export const LoginBox = (props: LoginBoxProps) => {
	const { login, isWorking } = useAuthService()

	const onLogin = (username: string, password: string) => {
		login({ username, password })
	}

	return (
		<Container>
			<LoginForm onLogin={onLogin} disabled={isWorking} />
			{isWorking && <LoadingSpinner />}
		</Container>
	)
}
