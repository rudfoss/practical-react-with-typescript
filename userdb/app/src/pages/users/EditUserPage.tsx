import { useParams } from "react-router-dom"

import { EditUser } from "@react-workshop/userdb-libs-users"

export const EditUserPage = () => {
	const { userId } = useParams<"userId">()

	if (!userId) {
		return <p>User id missing</p>
	}

	return <EditUser userId={userId} />
}
