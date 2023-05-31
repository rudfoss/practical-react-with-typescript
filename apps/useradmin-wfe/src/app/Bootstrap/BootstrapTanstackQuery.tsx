import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5
		}
	}
})

export interface BootstrapTanstackQueryProps {
	children: React.ReactNode
}

export const BootstrapTanstackQuery = ({ children }: BootstrapTanstackQueryProps) => {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools />
		</QueryClientProvider>
	)
}
