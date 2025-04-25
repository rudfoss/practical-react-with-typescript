import { CenteredLayout } from "@prwt/libs-ui"
import { RouteObject, createBrowserRouter } from "react-router-dom"
import { ParametersPage } from "./pages/ParametersPage"

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
		path: "users",
		children: [
			{
				path: ":id",
				element: <ParametersPage />
			}
		]
	}
]

export const router = createBrowserRouter([
	{
		element: <CenteredLayout />,
		children: appRoutes
	}
])
