import { useHeading } from "@react-workshop/ui"
import { DataServiceLoginForm, ProvideAuthDataService } from "@react-workshop/userdb-libs-auth"

export const DataServiceLoginPage = () => {
	useHeading("Data service powered login")
	return (
		<ProvideAuthDataService baseUrl="//localhost:4210">
			<DataServiceLoginForm />
		</ProvideAuthDataService>
	)
}
