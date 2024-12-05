import { createBrowserRouter, RouteObject } from "react-router-dom"

import { HeaderMainLayout } from "@practical-react/ui"

import { App } from "./App"
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
    element: <HeaderMainLayout />,
    children: appRoutes
  }
])
