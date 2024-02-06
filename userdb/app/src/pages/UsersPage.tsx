import { useParams } from "react-router-dom"

import { StaticUsersList } from "@react-workshop/userdb-libs-users"

export const UsersPage = () => {
	const { userId } = useParams<"userId">()

	return <StaticUsersList highlightUserId={userId} />
}
