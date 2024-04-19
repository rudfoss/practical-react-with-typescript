import { useHeading } from "@react-workshop/ui"
import { LoginForm } from "@react-workshop/userdb-auth"

const onLogin = (username: string, password: string) => {
	console.log({ username, password })
}

export const LoginPage = () => {
	useHeading("Login")
	return <LoginForm onLogin={onLogin} />
}
