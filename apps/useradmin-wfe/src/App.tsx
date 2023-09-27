import { useState } from "react"

import { BooleanField } from "./BooleanField"
import { TextField } from "./TextField"

export const App = () => {
	const [name, setName] = useState("")
	const [isAdmin, setIsAdmin] = useState(false)

	return (
		<div>
			<h1>Hello world</h1>
			<TextField label="User name" value={name} onChange={setName} />
			<BooleanField label="Is admin" value={isAdmin} onChange={setIsAdmin} />
		</div>
	)
}
