import { useState } from "react"

import { BooleanField } from "./BooleanField"
import { ClickUntil } from "./ClickUntil"
import { NumericField } from "./NumericField"
import { TextField } from "./TextField"

export const ClickUntilForm = () => {
	const [message, setMessage] = useState("")
	const [limit, setLimit] = useState(10)
	const [bypassLimit, setBypassLimit] = useState(false)

	return (
		<div>
			<TextField label="Message" value={message} setValue={setMessage} />
			<NumericField
				label="Limit"
				min={1}
				max={42}
				value={limit}
				setValue={setLimit}
			/>
			<BooleanField
				label="Bypass limit"
				value={bypassLimit}
				setValue={setBypassLimit}
			/>
			<ClickUntil message={message} limit={limit} bypassLimit={bypassLimit} />
		</div>
	)
}
