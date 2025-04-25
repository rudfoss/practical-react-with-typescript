import { useHeader } from "@prwt/libs-ui"
import { useHealthQuery } from "../healthQueries"
import { LoginForm } from "../tasks"

export const LoginPage = () => {
	useHeader("Log in")
	const { data } = useHealthQuery()

	return (
		<>
			<p>data: {JSON.stringify(data)}</p>
			<LoginForm onLogin={() => ""} />
		</>
	)
}
