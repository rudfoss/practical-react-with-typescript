import { useState } from "react"

import { BooleanField } from "./BooleanField"
import { NumericField } from "./NumericField"
import { TextField } from "./TextField"

export const Fields = () => {
	const [isChecked, setIsChecked] = useState(false)
	const [intValue, setIntValue] = useState(0)
	const [smallIntValue, setSmallIntValue] = useState(0)
	const [decimalValue, setDecimalValue] = useState(23.432)
	const [name, setName] = useState("")

	return (
		<div>
			<TextField label="Name" value={name} onChange={setName} />
			<BooleanField label="Check me" value={isChecked} onChange={setIsChecked} />
			<NumericField label="Integer input" value={intValue} onChange={setIntValue} />
			<NumericField label="Small input" value={smallIntValue} onChange={setSmallIntValue} max={9} />
			<NumericField
				label="Decimal value"
				value={decimalValue}
				onChange={setDecimalValue}
				allowDecimals
			/>
			<pre>
				<code>{`
isChecked:     ${isChecked}
intValue:      ${intValue}
smallIntValue: ${smallIntValue}
decimalValue:  ${decimalValue}
        `}</code>
			</pre>
		</div>
	)
}
