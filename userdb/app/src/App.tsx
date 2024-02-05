import { useState } from "react"

import { ChoiceField } from "./ChoiceField"
import { ChoiceFieldChoice } from "./ChoiceFieldChoice"
import { StaticGroupList } from "./StaticGroupList"
import { StaticUsersList } from "./StaticUsersList"

const choices: ChoiceFieldChoice[] = [
	{
		label: "foo",
		value: "foo"
	},
	{
		label: "bar",
		value: "bar"
	},
	{
		label: "baz",
		value: "baz"
	}
]

export const App = () => {
	const [choiceValue, setChoiceValue] = useState<ChoiceFieldChoice>()

	return (
		<>
			<StaticGroupList />
			<StaticUsersList />
			<ChoiceField
				label="Choice"
				options={choices}
				value={choiceValue}
				onChange={setChoiceValue}
				variant="select"
			/>
		</>
	)
}
