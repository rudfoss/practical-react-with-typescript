import { RouterProvider, createBrowserRouter } from "react-router-dom"

import { MainLayout } from "./MainLayout"
import { HomePage } from "./pages/HomePage"
import { UserDetailsPage } from "./pages/UserDetailsPage"
import { UsersListPage } from "./pages/UsersListPage"

const router = createBrowserRouter([
	{
		element: <MainLayout />,
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
			}
		]
	}
])

export const App = () => {
	return <RouterProvider router={router} />
}
