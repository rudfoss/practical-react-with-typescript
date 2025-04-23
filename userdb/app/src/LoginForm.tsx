import { FormEvent, useState } from "react"
import { CheckboxField } from "./CheckboxField"
import { TextField } from "./TextField"

export interface LoginFormProps {
	disabled?: boolean
	onLogin: (username: string, password: string) => unknown
}

export const LoginForm = ({ disabled, onLogin }: LoginFormProps) => {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [showPassword, setShowPassword] = useState(false)
	const isValid = username.length > 0 && password.length > 0

	const onSubmit = (eventObject: FormEvent<HTMLFormElement>) => {
		eventObject.preventDefault()
		if (!isValid) return
		onLogin(username, password)
	}

	return (
		<form onSubmit={onSubmit}>
			<TextField
				disabled={disabled}
				label="User name"
				value={username}
				onChange={setUsername}
			/>
			<TextField
				disabled={disabled}
				label="Password"
				value={password}
				onChange={setPassword}
			/>
			<CheckboxField
				disabled={disabled}
				label="Show password"
				value={showPassword}
				onChange={setShowPassword}
			/>
			<button type="submit" disabled={disabled || !isValid}>
				Log in
			</button>
		</form>
	)
}
