import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ReactNode } from "react"

import { FieldsController } from "@practical-react/ui"
import { ProvideApiClientsService } from "@practical-react/userdb-api-clients-react"

import { ProvideHeaderService } from "./headerService"

const queryClient = new QueryClient()

export interface BootstrapProps {
  children: ReactNode
}

export const Bootstrap = ({ children }: BootstrapProps) => (
  <ProvideApiClientsService baseUrl="http://localhost:4000">
    <QueryClientProvider client={queryClient}>
      <ProvideHeaderService>
        <FieldsController>{children}</FieldsController>
      </ProvideHeaderService>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </ProvideApiClientsService>
)
