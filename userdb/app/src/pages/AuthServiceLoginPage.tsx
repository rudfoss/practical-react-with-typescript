import { useHeading } from "@react-workshop/ui"
import {
	AuthServiceLoginForm,
	ProvideAuthDataService,
	ProvideAuthService
} from "@react-workshop/userdb-libs-auth"

export const AuthServiceLoginPage = () => {
	useHeading("Auth service powered login")
	return (
		<ProvideAuthDataService baseUrl="//localhost:4210">
			<ProvideAuthService>
				<AuthServiceLoginForm />
			</ProvideAuthService>
		</ProvideAuthDataService>
	)
}
