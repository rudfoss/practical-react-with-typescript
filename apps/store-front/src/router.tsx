import { Outlet, createBrowserRouter } from "react-router-dom"

import { MainLayout } from "./MainLayout"
import { Nav } from "./Nav"
import { HomePage } from "./pages/HomePage"
import { ProductDetailsPage } from "./pages/ProductDetailsPage"
import { ProductsPage } from "./pages/ProductsPage"

export const router = createBrowserRouter([
	{
		element: (
			<MainLayout nav={<Nav />} footer={<p>footer</p>}>
				<Outlet />
			</MainLayout>
		),
		children: [
			{
				index: true,
				element: <HomePage />
			},
			{
				path: "products",
				children: [
					{
						index: true,
						element: <ProductsPage />
					},
					{
						path: ":productId",
						element: <ProductDetailsPage />
					}
				]
			}
		]
	}
])
