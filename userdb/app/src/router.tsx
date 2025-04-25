import { Header, MainLayout } from "@prwt/libs-ui"
import { RouteObject, createBrowserRouter } from "react-router-dom"
import { GroupsPage } from "./pages/GroupsPage"

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
		path: "grupper",
		children: [
			{
				index: true,
				element: <GroupsPage />
			},
			{
				path: ":id",
				element: <GroupsPage />
			}
		]
	}
]

export const router = createBrowserRouter([
	{
		element: (
			<MainLayout header={<Header>User database</Header>} menu={<p>Menu</p>} />
		),
		children: appRoutes
	}
])
