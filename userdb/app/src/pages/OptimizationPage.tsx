import { useState } from "react"

import { TextField } from "@react-workshop/fields"

import { Optimization } from "../Optimization"

export const OptimizationPage = () => {
	const [text, setText] = useState("")

	return (
		<>
			<TextField label="Write something" value={text} onChange={setText} />
			<Optimization />
		</>
	)
}
