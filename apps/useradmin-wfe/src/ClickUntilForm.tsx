import { useState } from "react"

import { ClickUntil } from "./ClickUntil"
import { NumericField } from "./NumericField"
import { TextField } from "./TextField"

export const ClickUntilForm = () => {
	const [limit, setLimit] = useState(15)
	const [limitMessage, setLimitMessage] = useState("limit reached")

	return (
		<>
			<NumericField label="Limit" value={limit} onChange={setLimit} min={1} max={30} />
			<TextField label="Limit message" value={limitMessage} onChange={setLimitMessage} />
			<ClickUntil limit={limit} limitMessage={limitMessage} />
		</>
	)
}
