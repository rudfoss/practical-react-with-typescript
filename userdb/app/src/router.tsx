import { RouteObject, createBrowserRouter } from "react-router-dom"

import { Header, MainLayout } from "@react-workshop/ui"

import { Bootstrap } from "./Bootstrap"
import { MainMenu } from "./MainMenu"
import { ApiStatusPage } from "./pages/ApiStatusPage"
import { AuthServiceLoginPage } from "./pages/AuthServiceLoginPage"
import { BasicLoginPage } from "./pages/BasicLoginPage"
import { DataServiceLoginPage } from "./pages/DataServiceLoginPage"
import { FieldsPage } from "./pages/FieldsPage"
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
		children: [
			{
				path: "basic",
				children: [
					{
						index: true,
						element: <BasicLoginPage />
					}
				]
			},
			{
				path: "data-service",
				children: [
					{
						index: true,
						element: <DataServiceLoginPage />
					}
				]
			},
			{
				path: "auth-service",
				children: [
					{
						index: true,
						element: <AuthServiceLoginPage />
					}
				]
			}
		]
	},
	{
		path: "users",
		children: [
			{
				index: true,
				lazy: async () => {
					const { UsersPage } = await import("./pages/UsersPage")
					return { Component: UsersPage }
				}
			},
			{
				path: ":userId",
				lazy: async () => {
					const { UsersPage } = await import("./pages/UsersPage")
					return { Component: UsersPage }
				}
			}
		]
	},
	{
		path: "groups",
		children: [
			{
				index: true,
				element: <GroupsPage />
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
