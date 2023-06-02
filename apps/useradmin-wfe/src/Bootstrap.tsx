import { ProvideFieldStateService } from "@prwt/fields"
import { MainLayout } from "@prwt/layouts"

import { NavServiceProvider } from "./NavServiceProvider"
import { Navigation } from "./Navigation"

export const Bootstrap = () => {
	return (
		<ProvideFieldStateService>
			<NavServiceProvider>
				<MainLayout navigation={<Navigation />} heading="User management" />
			</NavServiceProvider>
		</ProvideFieldStateService>
	)
}
