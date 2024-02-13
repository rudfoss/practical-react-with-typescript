import { useHeading } from "@react-workshop/ui"
import { ProvideApiClientsService } from "@react-workshop/userdb-api-clients"
import {
	AuthServiceLoginForm,
	ProvideAuthDataService,
	ProvideAuthService
} from "@react-workshop/userdb-libs-auth"

export const AuthServiceLoginPage = () => {
	useHeading("Auth service powered login")
	return (
		<ProvideApiClientsService baseUrl="//localhost:4210">
			<ProvideAuthDataService>
				<ProvideAuthService>
					<AuthServiceLoginForm />
				</ProvideAuthService>
			</ProvideAuthDataService>
		</ProvideApiClientsService>
	)
}
