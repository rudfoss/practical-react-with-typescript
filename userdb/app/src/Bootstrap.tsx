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

const queryClient = new QueryClient()

export interface BootstrapProps {
	children: ReactNode
}

export const Bootstrap = ({ children }: BootstrapProps) => {
	return (
		<QueryClientProvider client={queryClient}>
			<ProvideSessionTokenService>
				<ProvideAuthDataService baseUrl="//localhost:4210">
					<ProvideAuthService>
						<ProvideFieldsService>
							<ProvideHeaderService>{children}</ProvideHeaderService>
						</ProvideFieldsService>
						<ReactQueryDevtools />
					</ProvideAuthService>
				</ProvideAuthDataService>
			</ProvideSessionTokenService>
		</QueryClientProvider>
	)
}
