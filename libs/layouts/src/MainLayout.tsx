import styled from "@emotion/styled"
import { Outlet } from "react-router-dom"

import { LayoutProps } from "./LayoutProps"

const Container = styled.div`
	display: flex;
`
const NavContainer = styled.div`
	width: 200px;
	padding: 8px;
`
const MainContainer = styled.main`
	flex: 1 1 auto;
`

export interface MainLayoutProps extends LayoutProps {
	heading?: string
	navigation: React.ReactNode
}

export const MainLayout = ({
	heading,
	navigation,
	children = <Outlet />
}: MainLayoutProps) => {
	return (
		<>
			{heading && (
				<header>
					<h1>{heading}</h1>
				</header>
			)}
			<Container>
				<NavContainer>{navigation}</NavContainer>
				<MainContainer>{children}</MainContainer>
			</Container>
		</>
	)
}
