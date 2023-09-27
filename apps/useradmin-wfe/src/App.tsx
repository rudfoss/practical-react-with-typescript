import { useState } from "react"

import { BooleanField } from "./BooleanField"
import { ClickUntil } from "./ClickUntil"
import { NumericField } from "./NumericField"
import { RedFrame } from "./RedFrame"
import { TextField } from "./TextField"

export const App = () => {
	const [name, setName] = useState("")
	const [isAdmin, setIsAdmin] = useState(false)
	const [age, setAge] = useState(20)

	return (
		<div>
			<h1>Hello world</h1>
			<NumericField
				label="Age"
				value={age}
				onChange={setAge}
				min={20}
				max={45}
			/>
		</div>
	)
}
