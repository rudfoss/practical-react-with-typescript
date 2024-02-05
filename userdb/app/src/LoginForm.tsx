import { FormEvent, useState } from "react"

import { TextField } from "./TextField"

export interface LoginFormProps {
	onLogin: (username: string, password: string) => unknown
}

export const LoginForm = ({ onLogin }: LoginFormProps) => {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	const onSubmit = (event: FormEvent) => {
		event.preventDefault()
		onLogin(username, password)
	}

	const onReset = () => {
		setUsername("")
		setPassword("")
	}

	return (
		<form onSubmit={onSubmit}>
			<TextField label="User name" value={username} onChange={setUsername} />
			<TextField type="password" label="Password" value={password} onChange={setPassword} />
			<input type="reset" value="Clear" onClick={onReset} />
			<input type="submit" value="Log in" />
		</form>
	)
}
