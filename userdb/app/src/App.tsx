import { useState } from "react"

import { ChoiceField, ChoiceFieldChoice } from "@react-workshop/fields"
import { StaticGroupList } from "@react-workshop/userdb-libs-groups"
import { StaticUser, StaticUsersList, staticUsers } from "@react-workshop/userdb-libs-users"

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
