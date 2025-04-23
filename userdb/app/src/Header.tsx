import { ReactNode } from "react"

export interface HeaderProps {
	children?: ReactNode
}

export const Header = ({ children = "Test heading" }: HeaderProps) => {
	return <h1>{children}</h1>
}
