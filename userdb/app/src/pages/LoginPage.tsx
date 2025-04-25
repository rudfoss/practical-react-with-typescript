import { useHeader } from "@prwt/libs-ui"
import { LoginForm } from "../tasks"

export const LoginPage = () => {
	useHeader("Log in")
	return <LoginForm onLogin={() => ""} />
}
