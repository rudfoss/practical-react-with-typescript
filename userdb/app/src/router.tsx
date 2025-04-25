import { Outlet, createBrowserRouter } from "react-router-dom"

const appRoutes = [
	{
		index: true,
		element: <p>Welcome to the User Database</p>
	},
	{
		path: "status",
		element: <p>This is the status page</p>
	}
]

export const router = createBrowserRouter([
	{
		element: (
			<>
				<header>
					<h1>Hello from the router</h1>
				</header>
				<main>
					<Outlet />
				</main>
			</>
		),
		children: appRoutes
	}
])
