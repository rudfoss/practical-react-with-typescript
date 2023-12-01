import { lazy } from "react"
import { createBrowserRouter } from "react-router-dom"

import { MainLayout } from "./MainLayout"
import { HomePage } from "./pages/HomePage"

const ProductsPage = lazy(async () => {
	const productsPageImport = await import("./pages/ProductsPage")
	return {
		default: productsPageImport.ProductsPage
	}
})
const ProductDetailsPage = lazy(async () => {
	const productDetailsPageImport = await import("./pages/ProductDetailsPage")
	return {
		default: productDetailsPageImport.ProductDetailsPage
	}
})

export const router = createBrowserRouter([
	{
		element: <MainLayout />,
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
