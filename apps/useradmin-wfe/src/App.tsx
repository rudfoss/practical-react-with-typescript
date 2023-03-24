import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Link, RouterProvider, createBrowserRouter } from "react-router-dom"

import { ProvideAPIClientsService } from "@prt/data"

import { DisplayGroupsTable } from "./GroupsTable"
import { DisplayUsersTable } from "./UsersTable/DisplayUsersTable"
import { MainLayout } from "./layouts/MainLayout/MainLayout"
import { UserDetailsPage } from "./pages/UserDetailsPage"

const myRouter = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		children: [
			{
				index: true,
				element: <DisplayUsersTable />
			},
			{
				path: "users/:id",
				element: <UserDetailsPage />
			},
			{
				path: "groups",
				element: <DisplayGroupsTable />
			}
		]
	}
])

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
})

export const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<ProvideAPIClientsService baseUrl="http://localhost:4210">
				<RouterProvider router={myRouter} />
				<ReactQueryDevtools />
			</ProvideAPIClientsService>
		</QueryClientProvider>
	)
}
