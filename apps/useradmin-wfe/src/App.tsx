import { RouterProvider, createBrowserRouter } from "react-router-dom"

import { MainLayout } from "./MainLayout"
import { ErrorPage } from "./pages/ErrorPage/ErrorPage"
import { HomePage } from "./pages/HomePage"
import { TestErrorBoundaryPage } from "./pages/TestErrorBoundaryPage"
import { UserDetailsPage } from "./pages/UserDetailsPage"
import { UsersListPage } from "./pages/UsersListPage"

const router = createBrowserRouter([
	{
		element: <MainLayout />,
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
			}
		]
	}
])

export const App = () => {
	return <RouterProvider router={router} />
}
