import { ReactNode } from "react"
import { LayoutProps } from "../LayoutProps"
import styled from "@emotion/styled"
import { Outlet } from "react-router-dom"

const Container = styled.div`
	display: flex;
`
const Nav = styled.nav`
	flex: 0 0 150px;
`
const Main = styled.main`
	flex: 1 1 auto;
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
				<Nav>{nav}</Nav>
				<Main>{children}</Main>
			</Container>
			<footer>{footer}</footer>
		</>
	)
}
