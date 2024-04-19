import { useHeading } from "@react-workshop/ui"
import { Login } from "@react-workshop/userdb-auth"

export const LoginPage = () => {
	useHeading("Login")
	return <Login />
}
