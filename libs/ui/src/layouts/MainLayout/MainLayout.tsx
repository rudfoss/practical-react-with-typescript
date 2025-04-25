import { ReactNode } from "react"
import { Outlet } from "react-router-dom"

import { Header } from "../../Header"
import classes from "./MainLayout.module.css"
import { useHeaderService } from "./headerService"

export interface MainLayoutProps {
	menu: ReactNode
	children?: ReactNode
}

export const MainLayout = ({
	menu,
	children = <Outlet />
}: MainLayoutProps) => {
	const { header } = useHeaderService()

	return (
		<>
			<header>
				<Header>{header}</Header>
			</header>
			<div className={classes.content}>
				<nav>{menu}</nav>
				<main>{children}</main>
			</div>
		</>
	)
}
