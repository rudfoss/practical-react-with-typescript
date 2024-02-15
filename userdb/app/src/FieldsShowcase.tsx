import { useState } from "react"

import { CheckboxField, ChoiceField, ChoiceFieldChoice, TextField } from "@react-workshop/fields"
import { StaticGroup, staticGroups } from "@react-workshop/userdb-libs-groups"

const choiceOptions = staticGroups.map(
	(group): ChoiceFieldChoice<StaticGroup> => ({
		data: group,
		label: group.displayName,
		value: group.id
	})
)

export const FieldsShowcase = () => {
	const [text, setText] = useState("")
	const [choiceValue, setChoiceValue] = useState<ChoiceFieldChoice<StaticGroup>>()
	const [isChecked, setIsChecked] = useState(false)

	return (
		<>
			<h2>Fields showcase</h2>
			<TextField label="Text field" value={text} onChange={setText} />
			<TextField variant="password" label="Password field" value={text} onChange={setText} />
			<ChoiceField
				variant="radio"
				label="Radio choice"
				options={choiceOptions}
				value={choiceValue}
				onChange={setChoiceValue}
			/>
			<ChoiceField
				label="Select choice"
				options={choiceOptions}
				value={choiceValue}
				onChange={setChoiceValue}
			/>
			<CheckboxField label="Checkbox" value={isChecked} onChange={setIsChecked} />
		</>
	)
}
