import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import { ProvideFieldStateService } from "@prwt/fields"
import { MainLayout } from "@prwt/layouts"
import { ProvideUserApiService } from "@prwt/user"

import { NavServiceProvider } from "./NavServiceProvider"
import { Navigation } from "./Navigation"

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60
		}
	}
})

export const Bootstrap = () => {
	return (
		<ProvideUserApiService baseUrl="http://localhost:4210">
			<QueryClientProvider client={queryClient}>
				<ProvideFieldStateService>
					<NavServiceProvider>
						<MainLayout navigation={<Navigation />} heading="User management" />
					</NavServiceProvider>
				</ProvideFieldStateService>

				<ReactQueryDevtools />
			</QueryClientProvider>
		</ProvideUserApiService>
	)
}
