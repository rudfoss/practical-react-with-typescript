import { ReactNode } from "react"

import classes from "./Header.module.css"

export interface HeaderProps {
	children?: ReactNode
}

export const Header = ({ children = "Test heading" }: HeaderProps) => {
	return <h1 className={classes.heading}>{children}</h1>
}
