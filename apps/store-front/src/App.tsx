import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Bootstrap } from "./Bootstrap"
import { lazy } from "react"
import { MainLayout } from "@prwt/layouts"
import { ErrorPage } from "./pages/ErrorPage"
import { Nav } from "./Nav"

const FieldsPage = lazy(async () => ({
	default: (await import("./pages/FieldsPage")).FieldsPage
}))

const router = createBrowserRouter([
	{
		element: (
			<Bootstrap>
				<MainLayout footer={<p>Footer</p>} nav={<Nav />} />
			</Bootstrap>
		),
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <h1>Hello world</h1>
			},
			{
				path: "fields",
				element: <FieldsPage />
			}
		]
	}
])

export const App = () => <RouterProvider router={router} />
