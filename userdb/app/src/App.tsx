import { LoginForm } from "./LoginForm"

const onLogin = (username: string, password: string) => {
  alert(`Logging you in with ${username} and ${password}`)
}

export const App = () => <LoginForm onLogin={onLogin} />
