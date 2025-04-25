import { ProvideHeaderService } from "@prwt/libs-ui"
import { ReactNode } from "react"

export interface BootstrapProps {
	children: ReactNode
}

export const Bootstrap = ({ children }: BootstrapProps) => {
	return <ProvideHeaderService>{children}</ProvideHeaderService>
}
