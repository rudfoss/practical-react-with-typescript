import { useHeader } from "@prwt/libs-ui"
import { useMutation } from "@tanstack/react-query"
import { useUserDbApiService } from "../clients/react"
import { LoginRequest } from "../clients/ts"
import { LoginForm } from "../tasks"

export const LoginPage = () => {
	const { authClient } = useUserDbApiService()
	useHeader("Log in")
	const { data: session, mutate: login } = useMutation({
		mutationFn: (login: LoginRequest) => authClient().login(login)
	})

	const onLogin = (username: string, password: string) => {
		login({ username, password })
	}

	if (session) {
		return (
			<>
				<h1>Welcome</h1>
				<p>
					Your token is <code>{session.token}</code>
				</p>
			</>
		)
	}

	return <LoginForm onLogin={onLogin} />
}
