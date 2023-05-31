import { lazy } from "react"
import { RouteObject, RouterProvider, createBrowserRouter } from "react-router-dom"

import { Bootstrap } from "./Bootstrap"
import { MainLayout } from "./layouts"
import { HomePage } from "./pages"
import { UsersPage } from "./pages/UsersPage"

const FieldsPage = lazy(async () => ({
	default: (await import("./pages/FieldsPage")).FieldsPage
}))

const routes: RouteObject[] = [
	{
		path: "/",
		element: (
			<Bootstrap>
				<MainLayout />
			</Bootstrap>
		),
		children: [
			{
				index: true,
				element: <HomePage />
			},
			{
				path: "fields",
				element: <FieldsPage />
			},
			{
				path: "users",
				element: <UsersPage />
			}
		]
	}
]
const router = createBrowserRouter(routes)

export const App = () => {
	return <RouterProvider router={router} />
}
