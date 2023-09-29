import { Outlet } from "react-router-dom"

import { ProvideNavService } from "@prwt/tasks"

import { Nav } from "./Nav"

export const MainLayout = () => {
	return (
		<main>
			<ProvideNavService>
				<Nav />
				<Outlet />
			</ProvideNavService>
		</main>
	)
}
