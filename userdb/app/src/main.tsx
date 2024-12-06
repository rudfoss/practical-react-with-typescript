import { StrictMode } from "react"
import * as ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"

import { Bootstrap } from "./Bootstrap"
import { router } from "./router"

const root = ReactDOM.createRoot(document.querySelector("#root") as HTMLElement)
root.render(
  <StrictMode>
    <Bootstrap>
      <RouterProvider router={router} />
    </Bootstrap>
  </StrictMode>
)
