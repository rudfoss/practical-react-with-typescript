import { ReactNode } from "react"
import { Outlet } from "react-router-dom"

export interface BootstrapProps {
	children?: ReactNode
}

export const Bootstrap = ({ children = <Outlet /> }: BootstrapProps) => {
	return <>{children}</>
}
