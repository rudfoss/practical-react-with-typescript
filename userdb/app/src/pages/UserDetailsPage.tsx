import { useParams } from "react-router-dom"

import { UserDetails } from "@react-workshop/userdb-auth"

export const UserDetailsPage = () => {
	const { userId } = useParams<"userId">()
	if (!userId) {
		return <p>User id parameter is required</p>
	}

	return <UserDetails userId={userId} />
}
