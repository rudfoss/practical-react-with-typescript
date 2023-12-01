import styled from "@emotion/styled"
import { ReactNode, Suspense } from "react"
import { Outlet } from "react-router-dom"

import { Nav as DefaultNav } from "./Nav"

const Wrapper = styled.div`
	min-height: 100vh;
	display: flex;
	flex-direction: column;
`
const Container = styled.div`
	flex: 1 0 auto;
	display: flex;
`
const Nav = styled.nav`
	flex: 0 0 150px;
	padding: 8px;
`
const Main = styled.main`
	flex: 1 1 auto;
`

export interface MainLayoutProps {
	nav?: ReactNode
	footer?: ReactNode
	children?: ReactNode
}

export const MainLayout = ({
	nav = <DefaultNav />,
	footer = <p>Footer</p>,
	children = <Outlet />
}: MainLayoutProps) => {
	return (
		<Wrapper>
			<Container>
				<Nav>{nav}</Nav>
				<Main>
					<Suspense fallback={<p>Loading...</p>}>{children}</Suspense>
				</Main>
			</Container>
			<footer>{footer}</footer>
		</Wrapper>
	)
}
