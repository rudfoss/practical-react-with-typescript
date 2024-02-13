import { useHeading } from "@react-workshop/ui"
import { StaticGroupList } from "@react-workshop/userdb-libs-groups"

export const StaticGroupsPage = () => {
	useHeading("Groups")
	return <StaticGroupList />
}
