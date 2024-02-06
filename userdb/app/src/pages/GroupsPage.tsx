import { useHeading } from "@react-workshop/ui"
import { StaticGroupList } from "@react-workshop/userdb-libs-groups"

export const GroupsPage = () => {
	useHeading("Groups")
	return <StaticGroupList />
}
