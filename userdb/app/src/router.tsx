import { RouteObject, createBrowserRouter } from "react-router-dom"

import { Header, MainLayout } from "@react-workshop/ui"

import { Bootstrap } from "./Bootstrap"
import { MainMenu } from "./MainMenu"
import { ApiStatusPage } from "./pages/ApiStatusPage"
import { BasicLoginPage } from "./pages/BasicLoginPage"
import { FieldsPage } from "./pages/FieldsPage"
import { GroupsPage } from "./pages/GroupsPage"
import { HomePage } from "./pages/HomePage"
import { OptimizationPage } from "./pages/OptimizationPage"
import { UsersPage } from "./pages/UsersPage"

const appRoutes: RouteObject[] = [
	{
		element: <HomePage />,
		index: true
	},
	{
		path: "basic-login",
		children: [
			{
				element: <BasicLoginPage />,
				index: true
			}
		]
	},
	{
		path: "users",
		children: [
			{
				element: <UsersPage />,
				index: true
			},
			{
				path: ":userId",
				element: <UsersPage />
			}
		]
	},
	{
		path: "groups",
		children: [
			{
				element: <GroupsPage />,
				index: true
			}
		]
	},
	{
		path: "optimization",
		element: <OptimizationPage />
	},
	{
		path: "status",
		element: <ApiStatusPage />
	},
	{
		path: "fields",
		element: <FieldsPage />
	}
]

export const router = createBrowserRouter([
	{
		element: (
			<Bootstrap>
				<MainLayout header={<Header />} menu={<MainMenu />} />
			</Bootstrap>
		),
		children: appRoutes
	}
])
