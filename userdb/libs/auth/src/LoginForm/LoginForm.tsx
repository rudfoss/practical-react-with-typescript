import { FormEvent, useState } from "react"

import { TextField } from "@react-workshop/fields"

export interface LoginFormProps {
	disabled?: boolean
	onLogin: (username: string, password: string) => unknown
}

export const LoginForm = ({ disabled, onLogin }: LoginFormProps) => {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	const onSubmit = (event: FormEvent) => {
		if (disabled) return
		event.preventDefault()
		onLogin(username, password)
	}

	const onReset = () => {
		setUsername("")
		setPassword("")
	}

	return (
		<form onSubmit={onSubmit}>
			<TextField label="User name" value={username} onChange={setUsername} disabled={disabled} />
			<TextField
				type="password"
				label="Password"
				value={password}
				onChange={setPassword}
				disabled={disabled}
			/>
			<input type="reset" value="Clear" onClick={onReset} disabled={disabled} />
			<input type="submit" value="Log in" disabled={disabled} />
		</form>
	)
}
