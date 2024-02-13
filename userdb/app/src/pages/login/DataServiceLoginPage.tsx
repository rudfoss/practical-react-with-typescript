import { useHeading } from "@react-workshop/ui"
import { ProvideApiClientsService } from "@react-workshop/userdb-api-clients"
import { DataServiceLoginForm, ProvideAuthDataService } from "@react-workshop/userdb-libs-auth"

export const DataServiceLoginPage = () => {
	useHeading("Data service powered login")
	return (
		<ProvideApiClientsService baseUrl="//localhost:4210">
			<ProvideAuthDataService>
				<DataServiceLoginForm />
			</ProvideAuthDataService>
		</ProvideApiClientsService>
	)
}
