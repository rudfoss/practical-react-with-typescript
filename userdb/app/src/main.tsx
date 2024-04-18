import { StrictMode } from "react"
import * as ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"

import { router } from "./router"

import "modern-normalize/modern-normalize.css"

const root = ReactDOM.createRoot(document.querySelector("#root") as HTMLElement)
root.render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
)
