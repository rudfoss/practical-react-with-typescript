import { Suspense } from "react"
import { Outlet } from "react-router-dom"

import { Nav } from "./Nav"

export const MainLayout = () => {
	return (
		<main>
			<Nav />
			<Suspense fallback={<p>Loading...</p>}>
				<Outlet />
			</Suspense>
		</main>
	)
}
