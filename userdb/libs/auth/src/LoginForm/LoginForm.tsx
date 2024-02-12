import styled from "@emotion/styled"
import { FormEvent, useState } from "react"

import { CheckboxField, TextField } from "@react-workshop/fields"

const ErrorContainer = styled.div`
	border: 1px solid red;
	background-color: #ffd8d8;
	padding: 8px;
	margin: 16px 8px;
`

export interface LoginFormProps {
	disabled?: boolean
	errorMessage?: string
	onLogin: (username: string, password: string) => unknown
}

export const LoginForm = ({ disabled, errorMessage, onLogin }: LoginFormProps) => {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false)
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	const hasData = username.length > 0 && password.length > 0

	const onSubmit = (event: FormEvent) => {
		event.preventDefault()
		if (disabled) return
		onLogin(username, password)
	}

	return (
		<form onSubmit={onSubmit}>
			<TextField label="User name" value={username} onChange={setUsername} disabled={disabled} />
			<TextField
				type={isPasswordVisible ? "text" : "password"}
				label="Password"
				value={password}
				onChange={setPassword}
				disabled={disabled}
			/>
			{errorMessage && <ErrorContainer>{errorMessage}</ErrorContainer>}
			<CheckboxField
				label="Show password"
				value={isPasswordVisible}
				onChange={setIsPasswordVisible}
			/>
			<input type="submit" value="Log in" disabled={!hasData || disabled} />
		</form>
	)
}
