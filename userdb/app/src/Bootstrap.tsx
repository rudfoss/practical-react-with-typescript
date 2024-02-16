import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ReactNode } from "react"

import { ProvideFieldsService } from "@react-workshop/fields"
import { ProvideHeaderContext } from "@react-workshop/ui"
import { ProvideApiClientsService } from "@react-workshop/userdb-api-clients"
import { ProvideAuthDataService, ProvideAuthService } from "@react-workshop/userdb-libs-auth"

const queryClient = new QueryClient()

export interface BootstrapProps {
	children: ReactNode
}

export const Bootstrap = ({ children }: BootstrapProps) => (
	<QueryClientProvider client={queryClient}>
		<ProvideApiClientsService baseUrl="http://localhost:4210">
			<ProvideFieldsService>
				<ProvideAuthDataService>
					<ProvideAuthService>
						<ProvideHeaderContext>{children}</ProvideHeaderContext>
					</ProvideAuthService>
				</ProvideAuthDataService>
			</ProvideFieldsService>
			<ReactQueryDevtools />
		</ProvideApiClientsService>
	</QueryClientProvider>
)
