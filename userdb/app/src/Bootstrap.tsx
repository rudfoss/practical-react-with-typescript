import { ReactNode } from "react"

import { ProvideHeaderService } from "./headerService"

export interface BootstrapProps {
  children: ReactNode
}

export const Bootstrap = ({ children }: BootstrapProps) => (
  <ProvideHeaderService>{children}</ProvideHeaderService>
)
