import { useState } from "react"

import { ChoiceField, ChoiceOption } from "@react-workshop/fields"
import { StaticGroup, staticGroups } from "@react-workshop/userdb-groups"

interface MyComponentProps {
	greeting: string
	suffix: string
	padWithWhitespaces: number
	hideSuffix?: boolean
}

const MyComponent = (props: MyComponentProps) => (
	<h2>
		MyComponent: {props.greeting}
		{props.suffix}
	</h2>
)

const onLogin = (username: string, password: string) => {
	console.log({ username, password })
}

const groupToChoiceOption = (group: StaticGroup): ChoiceOption => ({
	label: group.displayName,
	value: group.id
})

export const App = () => {
	const [group, setGroup] = useState<StaticGroup>()

	return (
		<>
			<ChoiceField
				label="Select something"
				value={group}
				options={staticGroups}
				optionsToChoiceOption={groupToChoiceOption}
				onChange={setGroup}
			/>
			<p>{group?.description}</p>
		</>
	)
}

// <h1>
// 	👋 Hello there
// 	<MyComponent greeting="Good morning" suffix="!" padWithWhitespaces={4} />
// 	{/* React.createElement(MyComponent, {greeting: "Good morning", suffix:"!", padWithWhitespaces: 4, hideSuffix: true }) */}
// </h1>
