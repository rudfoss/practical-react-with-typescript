import React, { useState } from "react"

import { ChoiceField, ChoiceFieldChoice } from "@react-workshop/fields"
import { StaticGroup, staticGroups } from "@react-workshop/userdb-libs-groups"

const groupChoices = staticGroups.map(
	(group): ChoiceFieldChoice<StaticGroup> => ({
		label: group.displayName,
		value: group.id,
		data: group
	})
)

export const App = () => {
	const [value, setValue] = useState<ChoiceFieldChoice<StaticGroup>>()

	return (
		<ChoiceField
			variant="dropDown"
			label="Pick a group"
			options={groupChoices}
			value={value}
			onChange={setValue}
		/>
	)
}

export const AppWithoutJsx = () =>
	React.createElement("div", {}, [
		React.createElement("hr"),
		React.createElement("h1", {
			"aria-label": "Hello there!",
			children: "Hello world 👋"
		}),
		React.createElement("hr")
	])
