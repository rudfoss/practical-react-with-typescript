import { ReactNode } from "react"

import { ProvideAuthService } from "@prwt/auth"

export interface BootstrapProps {
	children: ReactNode
}

export const Bootstrap = ({ children }: BootstrapProps) => {
	return <ProvideAuthService>{children}</ProvideAuthService>
}
