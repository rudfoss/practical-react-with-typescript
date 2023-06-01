import { useState } from "react"

import { TextField } from "@prwt/fields"
import { ClickUntilForm } from "@prwt/tasks"
import { Users } from "@prwt/user"

export const App = () => {
	const [text, setText] = useState("")
	return (
		<>
			<TextField label="Text field" value={text} onChange={setText} />
			<ClickUntilForm />
			<Users />
		</>
	)
}
