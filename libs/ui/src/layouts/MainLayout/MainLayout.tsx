import { ReactNode } from "react"
import { Outlet } from "react-router-dom"

import classes from "./MainLayout.module.css"

export interface MainLayoutProps {
	header: ReactNode
	menu: ReactNode
	children?: ReactNode
}

export const MainLayout = ({
	header,
	menu,
	children = <Outlet />
}: MainLayoutProps) => {
	return (
		<>
			<header>{header}</header>
			<div className={classes.content}>
				<nav>{menu}</nav>
				<main>{children}</main>
			</div>
		</>
	)
}
