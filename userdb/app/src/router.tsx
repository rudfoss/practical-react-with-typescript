import { Header, MainLayout } from "@prwt/libs-ui"
import { RouteObject, createBrowserRouter } from "react-router-dom"
import { MainMenu } from "./MainMenu"

const appRoutes: RouteObject[] = [
	{
		index: true,
		element: <p>Welcome</p>
	},
	{
		path: "status",
		children: [
			{
				path: "details",
				element: <p>Details</p>
			}
		]
	},
	{
		path: "groups",
		children: [
			{
				index: true,
				lazy: async () => {
					const { GroupsPage } = await import("./pages/GroupsPage")
					return {
						Component: GroupsPage
					}
				}
			},
			{
				path: ":id",
				lazy: async () => {
					const { GroupsPage } = await import("./pages/GroupsPage")
					return {
						Component: GroupsPage
					}
				}
			}
		]
	},
	{
		path: "users",
		children: [
			{
				index: true,
				element: <p>Users</p>
			}
		]
	}
]

export const router = createBrowserRouter([
	{
		element: (
			<MainLayout header={<Header>User database</Header>} menu={<MainMenu />} />
		),
		children: appRoutes
	}
])
