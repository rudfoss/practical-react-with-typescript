import { useHeading } from "@react-workshop/ui"
import { useAuthService } from "@react-workshop/userdb-libs-auth"
import { GroupsTableFromServer } from "@react-workshop/userdb-libs-groups"

export const GroupsPage = () => {
	useHeading("Groups")
	const { roles } = useAuthService()
	const canDelete = roles?.includes("Admin") || roles?.includes("UserAdmin")
	return <GroupsTableFromServer canDelete={canDelete} />
}
