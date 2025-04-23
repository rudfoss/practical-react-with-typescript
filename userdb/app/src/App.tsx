import { LoginForm } from "./LoginForm"

export const App = () => {
	const onLogin = (username: string, password: string) => {
		alert(`${username} : ${password}`)
	}
	return <LoginForm onLogin={onLogin} />
}
