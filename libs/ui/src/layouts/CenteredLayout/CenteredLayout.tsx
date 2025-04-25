import { ReactNode } from "react"
import { Outlet } from "react-router-dom"
import classes from "./CenteredLayout.module.css"

export interface CenteredLayoutProps {
	children?: ReactNode
}

export const CenteredLayout = ({
	children = <Outlet />
}: CenteredLayoutProps) => {
	return (
		<div className={classes.container}>
			<div>{children}</div>
		</div>
	)
}
