import styled from "@emotion/styled"
import { Outlet } from "react-router-dom"

const Container = styled.div`
	display: flex;
`
const NavContainer = styled.div`
	width: 200px;
`
const MainContainer = styled.main`
	flex: 1 1 auto;
`

export interface MainLayoutProps {
	navigation: React.ReactNode
}

export const MainLayout = ({ navigation }: MainLayoutProps) => {
	return (
		<Container>
			<NavContainer>{navigation}</NavContainer>
			<MainContainer>
				<Outlet />
			</MainContainer>
		</Container>
	)
}
