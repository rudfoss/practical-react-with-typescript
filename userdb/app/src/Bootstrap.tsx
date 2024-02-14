import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ReactNode } from "react"

import { ProvideFieldsService } from "@react-workshop/fields"
import { ProvideHeaderService } from "@react-workshop/ui"
import { ProvideApiClientsService } from "@react-workshop/userdb-api-clients"
import { ProvideAuthDataService, ProvideAuthService } from "@react-workshop/userdb-libs-auth"
import { ProvideGroupsDataService } from "@react-workshop/userdb-libs-groups"
import { ProvideUsersDataService } from "@react-workshop/userdb-libs-users"

const queryClient = new QueryClient()

export interface BootstrapProps {
	children: ReactNode
}

const baseUrl = "//localhost:4210"

export const Bootstrap = ({ children }: BootstrapProps) => (
	<QueryClientProvider client={queryClient}>
		<ProvideApiClientsService baseUrl={baseUrl}>
			<ProvideAuthDataService>
				<ProvideAuthService>
					<ProvideUsersDataService>
						<ProvideGroupsDataService>
							<ProvideFieldsService>
								<ProvideHeaderService>{children}</ProvideHeaderService>
							</ProvideFieldsService>
							<ReactQueryDevtools />
						</ProvideGroupsDataService>
					</ProvideUsersDataService>
				</ProvideAuthService>
			</ProvideAuthDataService>
		</ProvideApiClientsService>
	</QueryClientProvider>
)
