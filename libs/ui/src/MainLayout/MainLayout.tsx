import styled from "@emotion/styled"
import { ReactNode } from "react"
import { Outlet } from "react-router-dom"

const Columns = styled.div`
	display: flex;
	nav {
		flex: 0 0 180px;
		border-right: 1px solid #000;
		padding-right: 8px;
		margin-right: 8px;
	}
	main {
		flex: 1 1 auto;
		margin: 8px 0;
	}
`

export interface MainLayoutProps {
	header: ReactNode
	menu: ReactNode
	children?: ReactNode
}

export const MainLayout = ({ header, menu, children = <Outlet /> }: MainLayoutProps) => (
	<>
		{header}
		<Columns>
			<nav>{menu}</nav>
			<main>{children}</main>
		</Columns>
	</>
)
