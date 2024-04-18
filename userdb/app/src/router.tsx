import { RouteObject, createBrowserRouter } from "react-router-dom"

import { MainLayout } from "@react-workshop/ui"

import { MainMenu } from "./MainMenu"
import { GroupsPage } from "./pages/GroupsPage"
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
	}
]

export const router = createBrowserRouter([
	{
		element: <MainLayout menu={<MainMenu />} />,
		children: appRoutes
	}
])
