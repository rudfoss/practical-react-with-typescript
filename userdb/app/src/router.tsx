import { createBrowserRouter, RouteObject } from "react-router-dom"

import { MainLayout } from "@practical-react/ui"

import { App } from "./App"
import { Header } from "./Header"
import { Menu } from "./Menu"
import { LoginPage } from "./pages/LoginPage"

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
        element: <LoginPage />
      },
      {
        path: "user",
        element: <p>User login page</p>
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
