import { BootstrapTanstackQuery } from "./BootstrapTanstackQuery"

export interface BootstrapProps {
	children: React.ReactNode
}

export const Bootstrap = ({ children }: BootstrapProps) => {
	return <BootstrapTanstackQuery>{children}</BootstrapTanstackQuery>
}
