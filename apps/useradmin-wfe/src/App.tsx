import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

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
			<DisplayUsersTable />
			<ReactQueryDevtools />
		</QueryClientProvider>
	)
}
