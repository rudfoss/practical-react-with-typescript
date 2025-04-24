import { GroupsTable } from "./GroupsTable"
import { staticGroups } from "./StaticGroups"

export const App = () => {
	return <GroupsTable groups={staticGroups} />
}
