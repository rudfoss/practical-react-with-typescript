import { lazy } from "react"
import { RouterProvider, createBrowserRouter } from "react-router-dom"

import { Bootstrap } from "./Bootstrap"
import { MainLayout } from "./MainLayout"
import { ErrorPage } from "./pages/ErrorPage/ErrorPage"
import { HomePage } from "./pages/HomePage"
import { PickUserPage } from "./pages/PickUserPage"
import { TestErrorBoundaryPage } from "./pages/TestErrorBoundaryPage"
import { TestNetworkConnectionPage } from "./pages/TestNetworkConnectionPage"
import { TestServerDataPage } from "./pages/TestServerDataPage"
import { UserDetailsPage } from "./pages/UserDetailsPage"

const UsersListPage = lazy(async () => ({
	default: (await import("./pages/UsersListPage")).UsersListPage
}))

const router = createBrowserRouter([
	{
		element: (
			<Bootstrap>
				<MainLayout />
			</Bootstrap>
		),
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <HomePage />
			},
			{
				path: "users",
				children: [
					{
						index: true,
						element: <UsersListPage />
					},
					{
						path: ":userId",
						element: <UserDetailsPage />
					}
				]
			},
			{
				path: "test-error-boundary",
				element: <TestErrorBoundaryPage />
			},
			{
				path: "test-network",
				element: <TestNetworkConnectionPage />
			},
			{
				path: "pick-user",
				element: <PickUserPage />
			},
			{
				path: "test-server-data",
				element: <TestServerDataPage />
			}
		]
	}
])

export const App = () => {
	return <RouterProvider router={router} />
}
