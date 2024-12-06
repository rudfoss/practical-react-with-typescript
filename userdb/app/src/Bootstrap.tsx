import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode } from "react"

import { FieldsController } from "@practical-react/ui"

import { ProvideHeaderService } from "./headerService"

const queryClient = new QueryClient()

export interface BootstrapProps {
  children: ReactNode
}

export const Bootstrap = ({ children }: BootstrapProps) => (
  <QueryClientProvider client={queryClient}>
    <ProvideHeaderService>
      <FieldsController>{children}</FieldsController>
    </ProvideHeaderService>
  </QueryClientProvider>
)
