import styled from "@emotion/styled"
import { FormEvent, useState } from "react"

import { TextField, useFieldsService } from "@prwt/fields"

const Container = styled.div`
	background: linear-gradient(270deg, #132ca9, #bc1411);
	background-size: 400% 400%;
	animation: move 1s ease infinite;
	border-radius: 16px;
	margin: 8px;
	padding: 16px;
	box-shadow: 0 0 10px #535353;

	@keyframes move {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}
`
const InnerContainer = styled.div`
	background-color: #fff;
	border-radius: 8px;
	padding: 8px 12px;
	box-shadow: inset 0 0 10px #000000;
`
const Controls = styled.div`
	padding: 8px;
	display: flex;
	justify-content: center;
`

export interface LoginFormProps {
	onLogin?: (username: string, password: string) => unknown
}

export const LoginForm = ({ onLogin }: LoginFormProps) => {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const { isDisabled } = useFieldsService()

	const submitLoginForm = (evt: FormEvent) => {
		evt.preventDefault()
		onLogin?.(username, password)
	}

	return (
		<Container>
			<InnerContainer>
				<form onSubmit={submitLoginForm}>
					<TextField
						label="User name"
						value={username}
						setValue={setUsername}
					/>
					<TextField
						label="Password"
						value={password}
						setValue={setPassword}
						isPassword
					/>
					<Controls>
						<button disabled={isDisabled}>Login</button>
					</Controls>
				</form>
			</InnerContainer>
		</Container>
	)
}
