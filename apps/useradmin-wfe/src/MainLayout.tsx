import { Outlet } from "react-router-dom"

import { Nav } from "./Nav"

export const MainLayout = () => {
	return (
		<main>
			<Nav />
			<Outlet />
		</main>
	)
}
