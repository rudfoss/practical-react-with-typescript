import { FormEvent, useState } from "react"

import { CheckboxField, TextField } from "@react-workshop/fields"

export interface LoginFormProps {
	disabled?: boolean
	onLogin: (username: string, password: string) => unknown
}

export const LoginForm = ({ disabled, onLogin }: LoginFormProps) => {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [isPasswordVisible, setIsPasswordVisible] = useState(false)

	const hasUsernameAndPassword = username.length > 0 && password.length > 0
	const showPassword = isPasswordVisible ? "text" : "password"

	const submitLogin = (event: FormEvent) => {
		event.preventDefault()
		if (!hasUsernameAndPassword) return
		onLogin(username, password)
	}

	return (
		<form onSubmit={submitLogin}>
			<TextField label="User name" value={username} onChange={setUsername} />
			<TextField variant={showPassword} label="Password" value={password} onChange={setPassword} />
			<CheckboxField
				label="Show password"
				value={isPasswordVisible}
				onChange={setIsPasswordVisible}
			/>
			<button disabled={!hasUsernameAndPassword}>Log in</button>
		</form>
	)
}
