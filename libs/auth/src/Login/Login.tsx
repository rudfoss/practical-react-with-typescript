import { useMutation, useQueryClient } from "@tanstack/react-query"

import { ProvideFieldsService } from "@prwt/fields"
import {
	AuthControllerClient,
	ILoginRequest,
	LoginRequest
} from "@prwt/generated/store-api"

import { LoginForm } from "./LoginForm"

export const Login = () => {
	const queryClient = useQueryClient()
	const { mutate } = useMutation({
		mutationFn: (loginRequest: ILoginRequest) => {
			const client = new AuthControllerClient("http://localhost:4210")
			return client.login(new LoginRequest(loginRequest))
		},

		onSuccess: (data) => {
			queryClient.setQueryData(["userSession"], data)
		}
	})

	const onLogin = (username: string, password: string) => {
		mutate({
			username,
			password
		})
	}

	return (
		<ProvideFieldsService>
			<LoginForm onLogin={onLogin} />
		</ProvideFieldsService>
	)
}
