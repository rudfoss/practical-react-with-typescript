import { useState } from "react"

import { ClickUntil } from "./ClickUntil"
import { NumericField } from "./NumericField"
import { TextField } from "./TextField"

export const ClickUntilForm = () => {
	const [limit, setLimit] = useState(5)
	const [message, setMessage] = useState("Limit reached")

	return (
		<>
			<TextField label="Message" value={message} onChange={setMessage} />
			<NumericField label="Limit" value={limit} onChange={setLimit} />
			<ClickUntil limit={limit}>
				<p>{message}</p>
			</ClickUntil>
		</>
	)
}
