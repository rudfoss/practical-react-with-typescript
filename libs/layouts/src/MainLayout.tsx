import styled from "@emotion/styled"
import { Outlet } from "react-router-dom"

import { LayoutProps } from "./LayoutProps"

const Container = styled.div`
	display: flex;
`
const NavContainer = styled.div`
	width: 200px;
`
const MainContainer = styled.main`
	flex: 1 1 auto;
`

export interface MainLayoutProps extends LayoutProps {
	navigation: React.ReactNode
}

export const MainLayout = ({
	navigation,
	children = <Outlet />
}: MainLayoutProps) => {
	return (
		<Container>
			<NavContainer>{navigation}</NavContainer>
			<MainContainer>{children}</MainContainer>
		</Container>
	)
}
