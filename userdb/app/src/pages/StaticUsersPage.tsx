import { useParams } from "react-router-dom"

import { useHeading } from "@react-workshop/ui"
import { StaticUsersList } from "@react-workshop/userdb-libs-users"

export const StaticUsersPage = () => {
	useHeading("Users")
	const { userId } = useParams<"userId">()

	return <StaticUsersList highlightUserId={userId} />
}
