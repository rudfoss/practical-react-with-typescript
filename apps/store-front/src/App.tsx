import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Bootstrap } from "./Bootstrap"
import { lazy } from "react"
import { MainLayout } from "@prwt/layouts"

const FieldsPage = lazy(async () => ({
	default: (await import("./pages/FieldsPage")).FieldsPage
}))

const router = createBrowserRouter([
	{
		element: (
			<Bootstrap>
				<MainLayout footer={<p>Footer</p>} nav={<p>Nav</p>} />
			</Bootstrap>
		),
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
