import { GroupsTable, staticGroups } from "./groups"
import { LoginForm } from "./tasks"

export const App = () => {
	return (
		<>
			<LoginForm onLogin={() => ""} />
			<GroupsTable groups={staticGroups} />
		</>
	)
}
