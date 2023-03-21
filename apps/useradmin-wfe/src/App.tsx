import { RouteObject, RouterProvider, createBrowserRouter } from "react-router-dom"

import { Bootstrap } from "./Bootstrap"
import { Fields } from "./Fields"
import { MainLayout } from "./layouts"

const routes: RouteObject[] = [
	{
		path: "/",
		element: (
			<Bootstrap>
				<MainLayout />
			</Bootstrap>
		),
		children: [
			{
				index: true,
				element: <Fields />
			}
		]
	}
]
const router = createBrowserRouter(routes)

export const App = () => {
	return <RouterProvider router={router} />
}
