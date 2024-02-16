import { createBrowserRouter } from "react-router-dom"

import { Header, MainLayout } from "@react-workshop/ui"

import { MainMenu } from "./MainMenu"
import { ApiHealthPage } from "./pages/ApiHealthPage"
import { ApiStatsPage } from "./pages/ApiStatsPage"
import { FieldsPage } from "./pages/FieldsPage"
import { GroupDetailsPage } from "./pages/GroupDetailsPage"
import { HomePage } from "./pages/HomePage"
import { NaiveLoadFromServerPage } from "./pages/NaiveLoadFromServerPage"
import { StaticGroupPage } from "./pages/StaticGroupPage"

export const router = createBrowserRouter([
	{
		element: <MainLayout header={<Header />} menu={<MainMenu />} />,
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
				path: "stats",
				element: <ApiStatsPage />
			},
			{
				path: "health",
				element: <ApiHealthPage />
			},
			{
				path: "naive-load-data",
				element: <NaiveLoadFromServerPage />
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
