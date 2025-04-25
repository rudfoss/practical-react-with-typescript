import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { RouterProvider } from "react-router-dom"
import { router } from "./router"

import "./global.css"

// biome-ignore lint/style/noNonNullAssertion: This boots the app, we control the index.html which means we can guarantee this
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
)
