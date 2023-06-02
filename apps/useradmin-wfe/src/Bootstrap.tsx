import { ProvideFieldStateService } from "@prwt/fields"
import { MainLayout } from "@prwt/layouts"
import { ProvideUserApiService } from "@prwt/user"

import { NavServiceProvider } from "./NavServiceProvider"
import { Navigation } from "./Navigation"
import { ProvideQueryClient } from "./ProvideQueryClient"

export const Bootstrap = () => {
	return (
		<ProvideUserApiService baseUrl="http://localhost:4210">
			<ProvideQueryClient>
				<ProvideFieldStateService>
					<NavServiceProvider>
						<MainLayout navigation={<Navigation />} heading="User management" />
					</NavServiceProvider>
				</ProvideFieldStateService>
			</ProvideQueryClient>
		</ProvideUserApiService>
	)
}
