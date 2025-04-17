import { GroupsTable } from "./groups/GroupsTable"
import { staticGroups } from "./groups/staticGroups"

export const App = () => (
	<>
		<h1>Hello world</h1>
		<GroupsTable groups={staticGroups} />
	</>
)
