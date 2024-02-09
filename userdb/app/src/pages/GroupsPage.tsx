import { useHeading } from "@react-workshop/ui"
import { useEnsureFreshSessionOnMount } from "@react-workshop/userdb-libs-auth"
import { StaticGroupList } from "@react-workshop/userdb-libs-groups"

export const GroupsPage = () => {
	useHeading("Groups")
	useEnsureFreshSessionOnMount()
	return <StaticGroupList />
}
