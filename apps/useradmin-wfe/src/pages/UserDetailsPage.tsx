import { useParams } from "react-router-dom"

import { useWindowTitle } from "@prwt/tasks"
import { UserDetailsById } from "@prwt/user-admin"

export const UserDetailsPage = () => {
	const { userId } = useParams<"userId">()
	useWindowTitle(`User ${userId}`)

	return <UserDetailsById userId={userId} />
}
