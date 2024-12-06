import { createBrowserRouter, RouteObject } from "react-router-dom"

import { MainLayout } from "@practical-react/ui"

import { App } from "./App"
import { Header } from "./Header"
import { HeaderContextProvider } from "./HeaderContext"
import { Menu } from "./Menu"
import { GroupsPage } from "./pages/GroupsPage"
import { ParameterPage } from "./pages/ParameterPage"

const appRoutes: RouteObject[] = [
  {
    index: true,
    element: <App />
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
        element: <GroupsPage />
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
      <HeaderContextProvider>
        <MainLayout menu={<Menu />} header={<Header>Hello world!</Header>} />
      </HeaderContextProvider>
    ),
    children: appRoutes
  }
])
