import { LoginForm } from "@react-workshop/userdb-auth"

const onLogin = (username: string, password: string) => {
	console.log({ username, password })
}

export const LoginPage = () => <LoginForm onLogin={onLogin} />
