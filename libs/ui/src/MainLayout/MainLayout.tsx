import styled from "@emotion/styled"
import { ReactNode } from "react"
import { Outlet } from "react-router-dom"

const Columns = styled.div`
	display: flex;
	nav {
		flex: 0 0 150px;
	}
	main {
		flex: 1 1 auto;
	}
`

export interface MainLayoutProps {
	header: ReactNode
	menu: ReactNode
	children?: ReactNode
}

export const MainLayout = ({ header, menu, children = <Outlet /> }: MainLayoutProps) => {
	return (
		<>
			{header}
			<Columns>
				<nav>{menu}</nav>
				<main>{children}</main>
			</Columns>
		</>
	)
}
