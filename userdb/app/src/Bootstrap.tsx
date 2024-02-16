import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ReactNode } from "react"

import { ProvideFieldsService } from "@react-workshop/fields"
import { ProvideHeaderContext } from "@react-workshop/ui"

const queryClient = new QueryClient()

export interface BootstrapProps {
	children: ReactNode
}

export const Bootstrap = ({ children }: BootstrapProps) => (
	<QueryClientProvider client={queryClient}>
		<ProvideFieldsService>
			<ProvideHeaderContext>{children}</ProvideHeaderContext>
		</ProvideFieldsService>
		<ReactQueryDevtools />
	</QueryClientProvider>
)
