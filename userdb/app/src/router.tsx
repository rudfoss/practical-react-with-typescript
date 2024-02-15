import { createBrowserRouter } from "react-router-dom"

import { Header, MainLayout } from "@react-workshop/ui"

import { FieldsPage } from "./pages/FieldsPage"
import { HomePage } from "./pages/HomePage"
import { ParametersPage } from "./pages/ParametersPage"

export const router = createBrowserRouter([
	{
		element: <MainLayout header={<Header>Hello world 🥳</Header>} menu={<div />} />,
		errorElement: <p>Not found</p>,
		children: [
			{
				index: true,
				element: <HomePage />
			},
			{
				path: "fields",
				element: <FieldsPage />
			},
			{
				path: "groups/:groupId",
				element: <ParametersPage />
			}
		]
	}
])
