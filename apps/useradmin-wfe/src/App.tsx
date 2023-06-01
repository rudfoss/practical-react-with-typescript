import {
	RouterProvider,
	createBrowserRouter,
	RouteObject
} from "react-router-dom"

import { MainLayout } from "@prwt/layouts"

import { Navigation } from "./Navigation"
import { HomePage } from "./pages/HomePage"
import { UserDetailsPage } from "./pages/UserDetailsPage"
import { UsersPage } from "./pages/UsersPage"

const routes: RouteObject[] = [
	{
		element: <MainLayout navigation={<Navigation />} />,
		children: [
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
			},
			{
				path: "*",
				element: <p>Not found</p>
			}
		]
	}
]

export const App = () => {
	return <RouterProvider router={createBrowserRouter(routes)} />
}
