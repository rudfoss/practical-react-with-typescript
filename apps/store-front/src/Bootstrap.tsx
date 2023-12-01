import { ReactNode } from "react"

import { ProvideAuthService } from "@prwt/auth"
import { ProvideFieldsService } from "@prwt/fields"

import { ProvideReactQuery } from "./ProvideReactQuery"

export interface BootstrapProps {
	children: ReactNode
}

export const Bootstrap = ({ children }: BootstrapProps) => {
	return (
		<ProvideReactQuery>
			<ProvideAuthService>
				<ProvideFieldsService>{children}</ProvideFieldsService>
			</ProvideAuthService>
		</ProvideReactQuery>
	)
}
