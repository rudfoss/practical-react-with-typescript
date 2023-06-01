import { useState } from "react"

import { NumericField, TextField } from "@prwt/fields"

import { ClickUntil } from "./ClickUntil"

export const ClickUntilForm = () => {
	const [message, setMessage] = useState("")
	const [limit, setLimit] = useState(7)

	return (
		<>
			<TextField label="Limit message" value={message} onChange={setMessage} />
			<NumericField
				label="Limit"
				min={1}
				max={20}
				value={limit}
				onChange={setLimit}
			/>
			<ClickUntil limit={limit}>
				<p>{message}</p>
			</ClickUntil>
		</>
	)
}
