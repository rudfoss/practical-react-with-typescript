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
}

export const MainLayout = ({ header, menu }: MainLayoutProps) => {
	return (
		<>
			{header}
			<Columns>
				<nav>{menu}</nav>
				<main>
					<Outlet />
				</main>
			</Columns>
		</>
	)
}
