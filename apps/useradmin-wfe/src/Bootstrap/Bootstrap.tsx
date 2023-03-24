import { APIClientsProvider } from "@prt/data"

import { BootstrapTanstackQuery } from "./BootstrapTanstackQuery"

export interface BootstrapProps {
	children: React.ReactNode
}

export const Bootstrap = ({ children }: BootstrapProps) => {
	return (
		<BootstrapTanstackQuery>
			<APIClientsProvider baseUrl="http://localhost:4210">{children}</APIClientsProvider>
		</BootstrapTanstackQuery>
	)
}
