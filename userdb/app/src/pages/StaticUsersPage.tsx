import { useParams } from "react-router-dom"

import { useHeading } from "@react-workshop/ui"
import { useEnsureFreshSessionOnMount } from "@react-workshop/userdb-libs-auth"
import { StaticUsersList } from "@react-workshop/userdb-libs-users"

export const StaticUsersPage = () => {
	useHeading("Users")
	useEnsureFreshSessionOnMount()
	const { userId } = useParams<"userId">()

	return <StaticUsersList highlightUserId={userId} />
}
