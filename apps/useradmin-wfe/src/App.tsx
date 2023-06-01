import {
	RouterProvider,
	createBrowserRouter,
	RouteObject
} from "react-router-dom"

import { HomePage } from "./pages/HomePage"
import { UserDetailsPage } from "./pages/UserDetailsPage"
import { UsersPage } from "./pages/UsersPage"

const routes: RouteObject[] = [
	{
		index: true,
		element: <HomePage />
	},
	{
		path: "users",
		children: [
			{
				index: true,
				element: <UsersPage />
			},
			{
				path: ":userId",
				element: <UserDetailsPage />
			}
		]
	}
]

export const App = () => {
	return <RouterProvider router={createBrowserRouter(routes)} />
}
