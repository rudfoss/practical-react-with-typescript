import { StrictMode } from "react"
import * as ReactDOM from "react-dom/client"

import { App } from "./App"

import "modern-normalize/modern-normalize.css"

const root = ReactDOM.createRoot(document.querySelector("#root") as HTMLElement)
root.render(
	<StrictMode>
		<App />
	</StrictMode>
)
