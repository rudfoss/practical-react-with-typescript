import { useState } from "react"

import { TextField } from "./TextField"

export const App = () => {
	const [text, setText] = useState("")
	return <TextField label="Text field" value={text} onChange={setText} />
}
