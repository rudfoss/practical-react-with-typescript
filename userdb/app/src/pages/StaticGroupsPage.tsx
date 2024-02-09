import { useHeading } from "@react-workshop/ui"
import { useEnsureFreshSessionOnMount } from "@react-workshop/userdb-libs-auth"
import { StaticGroupList } from "@react-workshop/userdb-libs-groups"

export const StaticGroupsPage = () => {
	useHeading("Groups")
	useEnsureFreshSessionOnMount()
	return <StaticGroupList />
}
