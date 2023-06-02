import {
	RouterProvider,
	createBrowserRouter,
	RouteObject
} from "react-router-dom"

import { Bootstrap } from "./Bootstrap"
import { GroupDetailsPage } from "./pages/GroupDetailsPage"
import { GroupsPage } from "./pages/GroupsPage"
import { HomePage } from "./pages/HomePage"
import { ServerDataDemoPage } from "./pages/ServerDataDemoPage"
import { UserDetailsPage } from "./pages/UserDetailsPage"
import { UsersPage } from "./pages/UsersPage"

const routes: RouteObject[] = [
	{
		element: <Bootstrap />,
		children: [
			{
				index: true,
				element: <HomePage />
			},
			{
				path: "server-data-demo",
				element: <ServerDataDemoPage />
			},
			{
				path: "users",
				children: [
					{
						index: true,
						element: <UsersPage />
					},
					{
						path: ":userId",
						element: <UserDetailsPage />
					}
				]
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
						element: <GroupDetailsPage />
					}
				]
			},
			{
				path: "*",
				element: <p>Not found</p>
			}
		]
	}
]

export const App = () => {
	return <RouterProvider router={createBrowserRouter(routes)} />
}
