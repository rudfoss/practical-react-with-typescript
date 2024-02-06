import { RouteObject, createBrowserRouter } from "react-router-dom"

import { FieldsPage } from "./pages/FieldsPage"
import { GroupsPage } from "./pages/GroupsPage"
import { HomePage } from "./pages/HomePage"
import { UsersPage } from "./pages/UsersPage"

const appRoutes: RouteObject[] = [
	{
		element: <HomePage />,
		index: true
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
		path: "fields",
		element: <FieldsPage />
	}
]

export const router = createBrowserRouter([
	{
		children: appRoutes
	}
])
