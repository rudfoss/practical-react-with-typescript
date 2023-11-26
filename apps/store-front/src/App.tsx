import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Bootstrap } from "./Bootstrap"

const router = createBrowserRouter([
	{
		element: <Bootstrap />,
		children: [
			{
				index: true,
				element: <h1>Hello world</h1>
			}
		]
	}
])

export const App = () => <RouterProvider router={router} />
