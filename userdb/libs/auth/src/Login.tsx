import { useMutation } from "@tanstack/react-query"
import { useEffect } from "react"

import { useFieldsService } from "@react-workshop/fields"
import { LoginRequest, useApiClientsService } from "@react-workshop/userdb-api-clients"

import { LoginForm } from "./LoginForm"

export const Login = () => {
	const { toggleDisabled } = useFieldsService()
	const { authClient, setSessionToken, sessionToken } = useApiClientsService()
	const {
		data,
		mutate: login,
		isPending,
		reset
	} = useMutation({
		mutationFn: (loginRequest: LoginRequest) => authClient.current.login(loginRequest),
		onSuccess: (data) => {
			setSessionToken(data.token)
		}
	})
	const { mutate: logout } = useMutation({
		mutationFn: () => authClient.current.logout(),
		onSuccess: () => {
			setSessionToken()
			reset()
		}
	})

	useEffect(() => {
		toggleDisabled(isPending)
	}, [isPending, toggleDisabled])

	if (sessionToken || data?.token) {
		return <button onClick={() => logout()}>Log out</button>
	}

	return (
		<LoginForm onLogin={(username: string, password: string) => login({ username, password })} />
	)
}
