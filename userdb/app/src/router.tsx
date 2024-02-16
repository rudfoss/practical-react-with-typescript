import { createBrowserRouter } from "react-router-dom"

import { Header, MainLayout } from "@react-workshop/ui"

import { MainMenu } from "./MainMenu"
import { FieldsPage } from "./pages/FieldsPage"
import { GroupDetailsPage } from "./pages/GroupDetailsPage"
import { HomePage } from "./pages/HomePage"
import { StaticGroupPage } from "./pages/StaticGroupPage"

export const router = createBrowserRouter([
	{
		element: <MainLayout header={<Header>Hello world 🥳</Header>} menu={<MainMenu />} />,
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
				path: "groups",
				children: [
					{
						index: true,
						element: <StaticGroupPage />
					},
					{
						path: ":groupId",
						element: <GroupDetailsPage />
					}
				]
			}
		]
	}
])
