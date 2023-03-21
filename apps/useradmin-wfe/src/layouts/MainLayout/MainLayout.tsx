import { Global, css } from "@emotion/react"
import styled from "@emotion/styled"
import { Outlet } from "react-router-dom"

import { LayoutProps } from "../LayoutProps"

import { Navigation } from "./Navigation"

const globalStyles = css`
	#root {
		display: flex;
	}
`

const Sidebar = styled.div`
	width: 250px;
`
const Main = styled.main`
	flex: 1 1 auto;
`

export type MainLayoutProps = LayoutProps

export const MainLayout = ({ children = <Outlet /> }: MainLayoutProps) => {
	return (
		<>
			<Global styles={globalStyles} />
			<Sidebar>
				<Navigation />
			</Sidebar>
			<Main>{children}</Main>
		</>
	)
}
