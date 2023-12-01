import { useAuthService } from "@prwt/auth"

export const LoginFooter = () => {
	const { login, logout, isAuthenticated } = useAuthService()

	return (
		<button onClick={isAuthenticated ? logout : login}>Log in as admin</button>
	)
}
