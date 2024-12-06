import { ReactNode } from "react"

import { FieldsController } from "@practical-react/ui"

import { ProvideHeaderService } from "./headerService"

export interface BootstrapProps {
  children: ReactNode
}

export const Bootstrap = ({ children }: BootstrapProps) => (
  <ProvideHeaderService>
    <FieldsController>{children}</FieldsController>
  </ProvideHeaderService>
)
