import { useState } from "react"

import { ClickUntil } from "./ClickUntil"
import { NumericField, TextField } from "@prwt/fields"

export const ClickUntilForm = () => {
	const [limit, setLimit] = useState(5)
	const [message, setMessage] = useState("Limit reached")

	return (
		<>
			<TextField label="Message" value={message} onChange={setMessage} />
			<NumericField
				label="Limit"
				value={limit}
				onChange={setLimit}
				min={1}
				max={40}
			/>
			<ClickUntil limit={limit}>
				<p>{message}</p>
			</ClickUntil>
		</>
	)
}
