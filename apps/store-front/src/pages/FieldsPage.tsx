import { BooleanField, NumericField, TextField } from "@prwt/fields"
import { useState } from "react"

export const FieldsPage = () => {
	const [textValue, setTextValue] = useState<string>()
	const [numberValue, setNumberValue] = useState<number>()
	const [boolValue, setBoolValue] = useState<boolean>()

	return (
		<div>
			<TextField label="Text field" value={textValue} onChange={setTextValue} />
			<NumericField
				label="Number field"
				value={numberValue}
				onChange={setNumberValue}
			/>
			<BooleanField
				label="Text field"
				value={boolValue}
				onChange={setBoolValue}
			/>
		</div>
	)
}
