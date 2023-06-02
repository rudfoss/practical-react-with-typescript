import { GroupsListServer } from "@prwt/user"
import { useWindowTitle } from "@prwt/utils"

export const GroupsPage = () => {
	useWindowTitle("Groups")

	return <GroupsListServer />
}
