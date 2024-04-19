import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode } from "react"

import { ProvideHeaderService } from "@react-workshop/ui"
import { ProvideApiClientsService } from "@react-workshop/userdb-api-clients"

const queryClient = new QueryClient()

export interface BootstrapProps {
	children: ReactNode
}

export const Bootstrap = ({ children }: BootstrapProps) => (
	<ProvideApiClientsService baseUrl="http://localhost:4210">
		<QueryClientProvider client={queryClient}>
			<ProvideHeaderService>{children}</ProvideHeaderService>
		</QueryClientProvider>
	</ProvideApiClientsService>
)
