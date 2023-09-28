import { useParams } from "react-router-dom"

import { UserDetailsById } from "@prwt/user-admin"

export const UserDetailsPage = () => {
	const { userId } = useParams<"userId">()

	return <UserDetailsById userId={userId} />
}
