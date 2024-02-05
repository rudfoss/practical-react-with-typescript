import { useState } from "react"

import {
	CheckboxField,
	ChoiceField,
	ChoiceFieldChoice,
	MultiLineTextField,
	TextField
} from "@react-workshop/fields"
import { StaticUser, staticUsers } from "@react-workshop/userdb-libs-users"

const choiceOptions = staticUsers.map(
	(user): ChoiceFieldChoice<StaticUser> => ({
		data: user,
		label: user.displayName,
		value: user.id
	})
)

export const FieldsPage = () => {
	const [text, setText] = useState("")
	const [multiLineText, setMultiLineText] = useState("")
	const [choiceValue, setChoiceValue] = useState<ChoiceFieldChoice<StaticUser>>()
	const [isChecked, setIsChecked] = useState(false)

	return (
		<>
			<h2>Fields showcase</h2>
			<TextField label="Text field" value={text} onChange={setText} />
			<TextField type="password" label="Password field" value={text} onChange={setText} />
			<MultiLineTextField
				label="Multi line field"
				value={multiLineText}
				onChange={setMultiLineText}
			/>
			<ChoiceField
				label="Radio choice"
				options={choiceOptions}
				value={choiceValue}
				onChange={setChoiceValue}
			/>
			<ChoiceField
				variant="select"
				label="Select choice"
				options={choiceOptions}
				value={choiceValue}
				onChange={setChoiceValue}
			/>
			<CheckboxField label="Checkbox" value={isChecked} onChange={setIsChecked} />
		</>
	)
}
