import { useState } from "react"

import { ClickUntil } from "./ClickUntil"
import { TextField } from "./TextField"

export interface CombinedTextFieldClickUntilProps {
	limit?: number
}

export const CombinedTextFieldClickUntil = ({ limit = 10 }: CombinedTextFieldClickUntilProps) => {
	const [limitMessage, setLimitMessage] = useState("limit reached")

	return (
		<div>
			<TextField label="Limit message" value={limitMessage} onChange={setLimitMessage} />
			<ClickUntil limit={limit}>{limitMessage}</ClickUntil>
		</div>
	)
}
