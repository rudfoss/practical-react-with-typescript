import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import { ProvideAPIClientsService } from "@prt/data"

import { DisplayGroupsTable } from "./GroupsTable"
import { DisplayUsersTable } from "./UsersTable/DisplayUsersTable"

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
})

export const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<ProvideAPIClientsService baseUrl="http://localhost:4210">
				<DisplayUsersTable />
				<DisplayGroupsTable />
				<ReactQueryDevtools />
			</ProvideAPIClientsService>
		</QueryClientProvider>
	)
}
