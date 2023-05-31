import { useState } from "react"

import { StaticUser, staticUsers } from "@prwt/data"
import {
	BooleanField,
	ChoiceBase,
	ChoiceField,
	NumericField,
	TextField
} from "@prwt/fields"
import { SlowDown } from "@prwt/utils"

const userChoices = staticUsers.map((user): ChoiceBase & StaticUser => ({
	...user,
	label: user.userName,
	value: user.id
}))
type UserChoice = (typeof userChoices)[number]

export const FieldsPage = () => {
	const [name, setName] = useState("")
	const [selectedUser, setSelectedUser] = useState<UserChoice | undefined>()
	const [useRadioButtons, setUseRadioButtons] = useState(false)
	const [intValue, setIntValue] = useState(0)
	const [smallIntValue, setSmallIntValue] = useState(0)
	const [decimalValue, setDecimalValue] = useState(23.432)

	return (
		<div>
			<SlowDown factor={smallIntValue} />
			<TextField label="Name" value={name} onChange={setName} />
			<BooleanField
				label="use radio buttons"
				value={useRadioButtons}
				onChange={setUseRadioButtons}
			/>
			<ChoiceField
				label="Pick user"
				style={useRadioButtons ? "radio" : "dropDown"}
				choices={userChoices}
				value={selectedUser}
				onChange={setSelectedUser}
			/>
			<NumericField
				label="Integer input"
				value={intValue}
				onChange={setIntValue}
			/>
			<NumericField
				label="Small input"
				value={smallIntValue}
				onChange={setSmallIntValue}
				max={43}
			/>
			<NumericField
				label="Decimal value"
				value={decimalValue}
				onChange={setDecimalValue}
				allowDecimals
			/>
			<pre>
				<code>{`
name:          ${name}
user:          ${selectedUser?.userName} ${selectedUser?.id}
isChecked:     ${useRadioButtons}
intValue:      ${intValue}
smallIntValue: ${smallIntValue}
decimalValue:  ${decimalValue}
        `}</code>
			</pre>
		</div>
	)
}
