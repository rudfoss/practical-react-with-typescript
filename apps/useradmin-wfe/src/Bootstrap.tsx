import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ReactNode } from "react"

import { ProvideFieldsService } from "@prwt/fields"
import { ProvideNavService } from "@prwt/tasks"

const queryClient = new QueryClient()

export interface BootstrapProps {
	children: ReactNode
}

export const Bootstrap = ({ children }: BootstrapProps) => {
	return (
		<QueryClientProvider client={queryClient}>
			<ProvideFieldsService>
				<ProvideNavService>{children}</ProvideNavService>
			</ProvideFieldsService>
			<ReactQueryDevtools />
		</QueryClientProvider>
	)
}
