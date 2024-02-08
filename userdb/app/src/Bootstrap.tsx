import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ReactNode } from "react"

import { ProvideFieldsService } from "@react-workshop/fields"
import { ProvideHeaderService } from "@react-workshop/ui"
import { ProvideSessionTokenService } from "@react-workshop/userdb-libs-auth"

const queryClient = new QueryClient()

export interface BootstrapProps {
	children: ReactNode
}

export const Bootstrap = ({ children }: BootstrapProps) => {
	return (
		<QueryClientProvider client={queryClient}>
			<ProvideSessionTokenService>
				<ProvideFieldsService>
					<ProvideHeaderService>{children}</ProvideHeaderService>
				</ProvideFieldsService>
				<ReactQueryDevtools />
			</ProvideSessionTokenService>
		</QueryClientProvider>
	)
}
