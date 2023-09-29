import { ReactNode } from "react"

import { ProvideFieldsService } from "@prwt/fields"
import { ProvideNavService } from "@prwt/tasks"

export interface BootstrapProps {
	children: ReactNode
}

export const Bootstrap = ({ children }: BootstrapProps) => {
	return (
		<ProvideFieldsService>
			<ProvideNavService>{children}</ProvideNavService>
		</ProvideFieldsService>
	)
}
