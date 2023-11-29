import styled from "@emotion/styled"
import { ReactNode, Suspense } from "react"
import { Outlet } from "react-router-dom"

import { LayoutProps } from "../LayoutProps"

import { DefaultLoader } from "./DefaultLoader"

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
	loader?: ReactNode
}

export const MainLayout = ({
	nav,
	footer,
	loader = <DefaultLoader />,
	children = <Outlet />
}: MainLayoutProps) => {
	return (
		<>
			<Container>
				<Nav>{nav}</Nav>
				<Main>
					<Suspense fallback={loader}>{children}</Suspense>
				</Main>
			</Container>
			<footer>{footer}</footer>
		</>
	)
}
