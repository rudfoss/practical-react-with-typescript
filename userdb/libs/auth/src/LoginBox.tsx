import styled from "@emotion/styled"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { LoadingSpinner } from "@react-workshop/ui"
import { AuthControllerClient, LoginRequest } from "@react-workshop/userdb-api-clients"
import { delay } from "@react-workshop/utils"

import { LoginForm } from "./LoginForm"

const authClient = new AuthControllerClient("http://localhost:4210")

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
	const queryClient = useQueryClient()
	const { mutate, isPending } = useMutation({
		mutationFn: async (loginRequest: LoginRequest) => {
			await delay(undefined, 3000)
			return authClient.login(loginRequest)
		},
		onSuccess: (data) => {
			queryClient.setQueryData(["session"], data)
		}
	})

	const onLogin = (username: string, password: string) => {
		mutate({ username, password })
	}

	return (
		<Container>
			<LoginForm onLogin={onLogin} />
			{isPending && <LoadingSpinner />}
		</Container>
	)
}
