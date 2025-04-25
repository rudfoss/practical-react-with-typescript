import { MainLayout } from "@prwt/libs-ui"
import { RouteObject, createBrowserRouter } from "react-router-dom"
import { MainMenu } from "./MainMenu"
import { HomePage } from "./pages/HomePage"
import { LoginPage } from "./pages/LoginPage"
import { StatusPage } from "./pages/StatusPage"

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
		path: "status",
		element: <StatusPage />
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
		element: <MainLayout menu={<MainMenu />} />,
		children: appRoutes
	}
])
