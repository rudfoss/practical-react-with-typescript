import { RouteObject, createBrowserRouter } from "react-router-dom"

import { MainLayout } from "@react-workshop/ui"

import { MainMenu } from "./MainMenu"
import { BetterStatsPage } from "./pages/BetterStatsPage"
import { GroupsPage } from "./pages/GroupsPage"
import { HealthPage } from "./pages/HealthPage"
import { HomePage } from "./pages/HomePage"
import { OptimizationPage } from "./pages/OptimizationPage"
import { UserDetailsPage } from "./pages/UserDetailsPage"

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
		path: "users",
		children: [
			{
				path: ":userId",
				element: <UserDetailsPage />
			}
		]
	},
	{
		path: "stats",
		element: <BetterStatsPage />
	},
	{
		path: "health",
		element: <HealthPage />
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
