import { ChoiceField, ChoiceOption } from "@prwt/fields"
import { useNavService } from "@prwt/tasks"
import { User, users } from "@prwt/user-admin"

const choiceToOption = (user: User): ChoiceOption => {
	return {
		label: `${user.userName} ${user.lastName}`,
		id: user.id
	}
}

export const PickUserPage = () => {
	const { user, setUser, navigateToTheUser } = useNavService()

	const goToTheUser = () => {
		navigateToTheUser()
	}

	return (
		<>
			<button onClick={goToTheUser}>Go to the user</button>
			<ChoiceField
				label="Select a user"
				value={user}
				choices={users}
				choiceToOption={choiceToOption}
				onChange={setUser}
			/>
		</>
	)
}
