import { StrictMode } from "react"
import * as ReactDOM from "react-dom/client"

import "modern-normalize/modern-normalize.css"
import { App } from "./App"

const root = ReactDOM.createRoot(document.querySelector("#root") as HTMLElement)
root.render(
	<StrictMode>
		<App />
	</StrictMode>
)
