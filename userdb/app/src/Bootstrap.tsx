import { ReactNode } from "react"

import { ProvideHeaderContext } from "@react-workshop/ui"

export interface BootstrapProps {
	children: ReactNode
}

export const Bootstrap = ({ children }: BootstrapProps) => (
	<ProvideHeaderContext>{children}</ProvideHeaderContext>
)
