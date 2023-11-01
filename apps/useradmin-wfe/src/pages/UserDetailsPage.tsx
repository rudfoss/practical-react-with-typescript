import { useParams } from "react-router-dom"

import { useWindowTitle } from "@prwt/tasks"
import { UserDetailsFromServer } from "@prwt/user-admin"

export const UserDetailsPage = () => {
	const { userId } = useParams<"userId">()
	useWindowTitle(`User ${userId}`)

	if (!userId) {
		return <p>No such user id</p>
	}

	return <UserDetailsFromServer userId={userId} />
}
