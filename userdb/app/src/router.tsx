import { createBrowserRouter, RouteObject } from "react-router-dom"

import { MainLayout } from "@practical-react/ui"

import { Header } from "./Header"
import { Menu } from "./Menu"
import { ApiHealthPage } from "./pages/ApiHealthPage"
import { ApiStatsPage } from "./pages/ApiStatsPage"
import { GroupDetailsPage } from "./pages/GroupDetailsPage"
import { GroupsPage } from "./pages/GroupsPage"
import { HomePage } from "./pages/HomePage"
import { LoadDataPage } from "./pages/LoadDataPage"
import { ParameterPage } from "./pages/ParameterPage"

const appRoutes: RouteObject[] = [
  {
    index: true,
    element: <HomePage />
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
    path: "load",
    element: <LoadDataPage />
  },
  {
    path: "login",
    children: [
      {
        index: true,
        lazy: async () => {
          const { LoginPage } = await import("./pages/LoginPage")
          return { Component: LoginPage }
        }
      }
    ]
  },
  {
    path: "groups",
    children: [
      {
        index: true,
        element: <GroupsPage />
      },
      {
        path: ":groupId",
        element: <GroupDetailsPage />
      }
    ]
  },
  {
    path: "parameter",
    children: [
      {
        path: ":param",
        element: <ParameterPage />
      }
    ]
  }
]

export const router = createBrowserRouter([
  {
    element: (
      <MainLayout menu={<Menu />} header={<Header>Hello world!</Header>} />
    ),
    children: appRoutes
  }
])
