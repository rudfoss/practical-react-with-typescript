import { DataServiceLoginForm, ProvideAuthDataService } from "@react-workshop/userdb-libs-auth"

export const DataServiceLoginPage = () => {
	return (
		<ProvideAuthDataService baseUrl="//localhost:4210">
			<DataServiceLoginForm />
		</ProvideAuthDataService>
	)
}
