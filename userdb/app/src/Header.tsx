import { ReactNode } from "react"

export interface HeaderProps {
	underline?: boolean
	children: ReactNode
}

export const Header = ({ underline, children }: HeaderProps) => (
	<h1 style={{ textDecoration: underline ? "underline" : "" }}>{children}</h1>
)
