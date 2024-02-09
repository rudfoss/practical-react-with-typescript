import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ReactNode } from "react"

import { ProvideFieldsService } from "@react-workshop/fields"
import { ProvideHeaderService } from "@react-workshop/ui"
import {
	ProvideAuthDataService,
	ProvideAuthService,
	ProvideSessionTokenService
} from "@react-workshop/userdb-libs-auth"
import { ProvideGroupsDataService } from "@react-workshop/userdb-libs-groups"
import { ProvideUsersDataService } from "@react-workshop/userdb-libs-users"

const queryClient = new QueryClient()

export interface BootstrapProps {
	children: ReactNode
}

const baseUrl = "//localhost:4210"

export const Bootstrap = ({ children }: BootstrapProps) => {
	return (
		<QueryClientProvider client={queryClient}>
			<ProvideSessionTokenService>
				<ProvideAuthDataService baseUrl={baseUrl}>
					<ProvideAuthService>
						<ProvideUsersDataService baseUrl={baseUrl}>
							<ProvideGroupsDataService baseUrl={baseUrl}>
								<ProvideFieldsService>
									<ProvideHeaderService>{children}</ProvideHeaderService>
								</ProvideFieldsService>
								<ReactQueryDevtools />
							</ProvideGroupsDataService>
						</ProvideUsersDataService>
					</ProvideAuthService>
				</ProvideAuthDataService>
			</ProvideSessionTokenService>
		</QueryClientProvider>
	)
}
