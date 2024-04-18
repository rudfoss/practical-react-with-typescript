import { Outlet, RouteObject, createBrowserRouter } from "react-router-dom"

import { HomePage } from "./pages/HomePage"
import { LoginPage } from "./pages/LoginPage"

const appRoutes: RouteObject[] = [
	{
		index: true,
		element: <HomePage />
	},
	{
		path: "login",
		element: <LoginPage />
	}
]

export const router = createBrowserRouter([
	{
		element: <Outlet />,
		children: appRoutes
	}
])
