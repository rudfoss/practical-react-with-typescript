import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ReactNode } from "react"

import { ProvideFieldsService } from "@react-workshop/fields"
import { ProvideHeaderContext } from "@react-workshop/ui"
import { ProvideApiClientsService } from "@react-workshop/userdb-api-clients"

const queryClient = new QueryClient()

export interface BootstrapProps {
	children: ReactNode
}

export const Bootstrap = ({ children }: BootstrapProps) => (
	<QueryClientProvider client={queryClient}>
		<ProvideApiClientsService baseUrl="http://localhost:4210">
			<ProvideFieldsService>
				<ProvideHeaderContext>{children}</ProvideHeaderContext>
			</ProvideFieldsService>
			<ReactQueryDevtools />
		</ProvideApiClientsService>
	</QueryClientProvider>
)
