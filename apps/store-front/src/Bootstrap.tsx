import { ReactNode } from "react"

import { ProvideAuthService } from "@prwt/auth"
import { ProvideFieldsService } from "@prwt/fields"

export interface BootstrapProps {
	children: ReactNode
}

export const Bootstrap = ({ children }: BootstrapProps) => {
	return (
		<ProvideAuthService>
			<ProvideFieldsService>{children}</ProvideFieldsService>
		</ProvideAuthService>
	)
}
