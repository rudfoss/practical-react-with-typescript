import { RouteObject, createBrowserRouter } from "react-router-dom"

import { MainLayout } from "@react-workshop/ui"
import { delay } from "@react-workshop/utils"

import { MainMenu } from "./MainMenu"
import { GroupsPage } from "./pages/GroupsPage"
import { HomePage } from "./pages/HomePage"
import { OptimizationPage } from "./pages/OptimizationPage"

const appRoutes: RouteObject[] = [
	{
		index: true,
		element: <HomePage />
	},
	{
		path: "login",
		lazy: async () => {
			const loginPage = await import("./pages/LoginPage")
			return {
				Component: loginPage.LoginPage
			}
		}
	},
	{
		path: "groups",
		children: [
			{
				index: true,
				element: <GroupsPage />
			},
			{
				path: ":groupId",
				element: <GroupsPage />
			}
		]
	},
	{
		path: "optimize",
		element: <OptimizationPage />
	}
]

export const router = createBrowserRouter([
	{
		element: <MainLayout menu={<MainMenu />} />,
		children: appRoutes
	}
])
