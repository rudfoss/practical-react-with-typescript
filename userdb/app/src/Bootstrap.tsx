import { ProvideHeaderService } from "@prwt/libs-ui"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ReactNode } from "react"
import { ProvideUserDbApiService } from "./clients/react"

const queryClient = new QueryClient()

export interface BootstrapProps {
	children: ReactNode
}

export const Bootstrap = ({ children }: BootstrapProps) => {
	return (
		<QueryClientProvider client={queryClient}>
			<ProvideUserDbApiService baseUrl="http://localhost:4000">
				<ProvideHeaderService>{children}</ProvideHeaderService>
			</ProvideUserDbApiService>
			<ReactQueryDevtools />
		</QueryClientProvider>
	)
}
