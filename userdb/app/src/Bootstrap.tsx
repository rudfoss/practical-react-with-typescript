import { ProvideHeaderService } from "@prwt/libs-ui"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ReactNode } from "react"

const queryClient = new QueryClient()

export interface BootstrapProps {
	children: ReactNode
}

export const Bootstrap = ({ children }: BootstrapProps) => {
	return (
		<QueryClientProvider client={queryClient}>
			<ProvideHeaderService>{children}</ProvideHeaderService>
			<ReactQueryDevtools />
		</QueryClientProvider>
	)
}
