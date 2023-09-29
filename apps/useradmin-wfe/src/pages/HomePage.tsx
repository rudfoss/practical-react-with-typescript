import { useState } from "react"

import { TextField } from "@prwt/fields"
import { useRandom } from "@prwt/tasks"

export const HomePage = () => {
	const [value, setValue] = useState("")
	const randomValue = useRandom(value)

	return (
		<>
			<h1>Home page</h1>
			<p>Your value: {randomValue}</p>
			<TextField label="" value={value} onChange={setValue} />
		</>
	)
}
