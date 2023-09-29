import { useState } from "react"

import { ChoiceField, ChoiceOption } from "@prwt/fields"
import { User, users } from "@prwt/user-admin"

const choiceToOption = (user: User): ChoiceOption => {
	return {
		label: `${user.userName} ${user.lastName}`,
		id: user.id
	}
}

export const PickUserPage = () => {
	const [selectedUser, setSelectedUser] = useState<User>()

	const pickUser = () => {
		setSelectedUser(users[4])
	}

	return (
		<>
			<button onClick={pickUser}>Pick user</button>
			<ChoiceField
				label="Select a user"
				value={selectedUser}
				choices={users}
				choiceToOption={choiceToOption}
				onChange={setSelectedUser}
			/>
		</>
	)
}
