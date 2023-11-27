import { ReactNode } from "react"
import { LayoutProps } from "../LayoutProps"
import styled from "@emotion/styled"
import { Outlet } from "react-router-dom"

const Container = styled.div`
	display: flex;
`

export interface MainLayoutProps extends LayoutProps {
	nav: ReactNode
	footer: ReactNode
}

export const MainLayout = ({
	nav,
	footer,
	children = <Outlet />
}: MainLayoutProps) => {
	return (
		<>
			<Container>
				<nav>{nav}</nav>
				<main>{children}</main>
			</Container>
			<footer>{footer}</footer>
		</>
	)
}
