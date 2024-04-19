import { ReactNode } from "react"

import { ProvideHeaderService } from "@react-workshop/ui"

export interface BootstrapProps {
	children: ReactNode
}

export const Bootstrap = ({ children }: BootstrapProps) => (
	<ProvideHeaderService>{children}</ProvideHeaderService>
)
