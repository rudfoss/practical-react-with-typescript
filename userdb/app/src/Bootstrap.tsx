import { ReactNode } from "react"

import { ProvideFieldsService } from "@react-workshop/fields"
import { ProvideHeaderContext } from "@react-workshop/ui"

export interface BootstrapProps {
	children: ReactNode
}

export const Bootstrap = ({ children }: BootstrapProps) => (
	<ProvideFieldsService>
		<ProvideHeaderContext>{children}</ProvideHeaderContext>
	</ProvideFieldsService>
)
