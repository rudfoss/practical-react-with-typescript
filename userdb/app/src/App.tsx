import { useState } from "react"

import { ChoiceField, ChoiceFieldChoice } from "@react-workshop/fields"

import { StaticGroupList } from "./StaticGroupList"
import { StaticUsersList } from "./StaticUsersList"
import { StaticUser, staticUsers } from "./staticUsers"

const staticUserChoices = staticUsers.map(
	(user): ChoiceFieldChoice<StaticUser> => ({
		data: user,
		label: user.displayName,
		value: user.id
	})
)

export const App = () => {
	const [choiceValue, setChoiceValue] = useState<ChoiceFieldChoice<StaticUser>>()

	return (
		<>
			<StaticGroupList />
			<StaticUsersList />
			<ChoiceField
				label="Pick a user"
				options={staticUserChoices}
				value={choiceValue}
				onChange={setChoiceValue}
				variant="select"
			/>
		</>
	)
}
