import { Global, css } from "@emotion/react"
import { StrictMode } from "react"
import * as ReactDOM from "react-dom/client"

import { App } from "./App"

import "modern-normalize/modern-normalize.css"

const globalStyles = css`
	html,
	body {
		height: 100%;
	}
	#root {
		min-height: 100%;
	}
`

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
	<StrictMode>
		<Global styles={globalStyles} />
		<App />
	</StrictMode>
)
