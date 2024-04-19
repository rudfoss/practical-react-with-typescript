import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ReactNode } from "react"

import { ProvideFieldsService } from "@react-workshop/fields"
import { ProvideHeaderService } from "@react-workshop/ui"
import { ProvideApiClientsService } from "@react-workshop/userdb-api-clients"

const queryClient = new QueryClient()

export interface BootstrapProps {
	children: ReactNode
}

export const Bootstrap = ({ children }: BootstrapProps) => (
	<ProvideApiClientsService baseUrl="http://localhost:4210">
		<ProvideFieldsService>
			<QueryClientProvider client={queryClient}>
				<ProvideHeaderService>{children}</ProvideHeaderService>
				<ReactQueryDevtools />
			</QueryClientProvider>
		</ProvideFieldsService>
	</ProvideApiClientsService>
)
