import { ReactNode } from "react"

import { ProvideFieldsService } from "@react-workshop/fields"
import { ProvideHeaderService } from "@react-workshop/ui"

export interface BootstrapProps {
	children: ReactNode
}

export const Bootstrap = ({ children }: BootstrapProps) => {
	return (
		<ProvideFieldsService>
			<ProvideHeaderService>{children}</ProvideHeaderService>
		</ProvideFieldsService>
	)
}
