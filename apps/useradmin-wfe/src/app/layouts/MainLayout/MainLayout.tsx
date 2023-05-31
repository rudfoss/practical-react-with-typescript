import { Global, css } from "@emotion/react"
import styled from "@emotion/styled"
import { Suspense } from "react"
import { Outlet } from "react-router-dom"

import { LayoutProps } from "../LayoutProps"

import { Navigation } from "./Navigation"

const globalStyles = css`
	#root {
		display: flex;
	}
`

const Sidebar = styled.div`
	width: 200px;
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
			<Main>
				<Suspense fallback={<p>...</p>}>{children}</Suspense>
			</Main>
		</>
	)
}
