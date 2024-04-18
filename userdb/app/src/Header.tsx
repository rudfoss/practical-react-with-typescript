import { ReactNode } from "react"

import classes from "./Header.module.css"

export interface HeaderProps {
	emphasize?: boolean
	children: ReactNode
}

export const Header = ({ emphasize, children }: HeaderProps) => {
	const className = [classes.heading]
	if (emphasize) {
		className.push(classes.emphasized)
	}

	return <h1 className={className.join(" ")}>{children}</h1>
}
