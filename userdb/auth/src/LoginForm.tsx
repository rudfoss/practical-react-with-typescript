import { useState } from "react"

import { CheckboxField, PasswordField, TextField } from "@react-workshop/fields"

export interface LoginFormProps {
	disabled?: boolean
	onLogin: (username: string, password: string) => unknown
}

export const LoginForm = ({ disabled, onLogin }: LoginFormProps) => {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [showPassword, setShowPassword] = useState(false)
	const isInputValid = username.length > 0 && password.length > 0

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (disabled) return
		onLogin(username, password)
	}

	return (
		<form onSubmit={onSubmit}>
			<TextField label="User name" value={username} onChange={setUsername} disabled={disabled} />
			<PasswordField
				label="Password"
				value={password}
				onChange={setPassword}
				showPassword={showPassword}
				disabled={disabled}
			/>
			<CheckboxField
				label="Show password"
				value={showPassword}
				onChange={setShowPassword}
				disabled={disabled}
			/>
			<button disabled={!isInputValid || disabled}>Log in</button>
		</form>
	)
}
