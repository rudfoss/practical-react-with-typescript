import { RouteObject, createBrowserRouter } from "react-router-dom"

import { MainLayout } from "@react-workshop/ui"

import { MainMenu } from "./MainMenu"
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
		element: <MainLayout menu={<MainMenu />} />,
		children: appRoutes
	}
])
