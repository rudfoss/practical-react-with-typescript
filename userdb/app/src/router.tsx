import { RouteObject, createBrowserRouter } from "react-router-dom"

import { MainLayout } from "@react-workshop/ui"

import { MainMenu } from "./MainMenu"
import { HomePage } from "./pages/HomePage"
import { LoginPage } from "./pages/LoginPage"
import { ParametersPage } from "./pages/ParametersPage"

const appRoutes: RouteObject[] = [
	{
		index: true,
		element: <HomePage />
	},
	{
		path: "login",
		element: <LoginPage />
	},
	{
		path: "groups/:groupId",
		element: <ParametersPage />
	}
]

export const router = createBrowserRouter([
	{
		element: <MainLayout menu={<MainMenu />} />,
		children: appRoutes
	}
])
