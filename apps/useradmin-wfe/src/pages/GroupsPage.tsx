import { GroupsListStaticGroups } from "@prwt/user"
import { useWindowTitle } from "@prwt/utils"

export const GroupsPage = () => {
	useWindowTitle("Groups")

	return <GroupsListStaticGroups />
}
