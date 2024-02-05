import { RouteObject, createBrowserRouter } from "react-router-dom"

import { HomePage } from "./pages/HomePage"
import { UsersPage } from "./pages/UsersPage"

const appRoutes: RouteObject[] = [
	{
		element: <HomePage />,
		index: true
	},
	{
		path: "users",
		element: <UsersPage />
	}
]

export const router = createBrowserRouter([
	{
		errorElement: <h1>An error occurred</h1>,
		children: appRoutes
	}
])
