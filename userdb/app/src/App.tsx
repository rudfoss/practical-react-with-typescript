import { LoginForm } from "./LoginForm"

const onLogin = (username: string, password: string) => {
	console.log({ username, password })
}

export const App = () => {
	return <LoginForm onLogin={onLogin} />
}
